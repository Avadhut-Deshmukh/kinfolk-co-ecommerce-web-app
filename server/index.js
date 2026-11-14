import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Stripe from 'stripe';
import { SEED_PRODUCTS, SEED_ORDERS, SEED_INQUIRIES } from './data/seed.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { Contact } from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// In-Memory Fallback Store (ensures 100% uptime even if MongoDB isn't running)
let isMongoConnected = false;
let memoryProducts = JSON.parse(JSON.stringify(SEED_PRODUCTS));
let memoryOrders = JSON.parse(JSON.stringify(SEED_ORDERS));
let memoryInquiries = JSON.parse(JSON.stringify(SEED_INQUIRIES));
let memorySubscribers = [];

// Initialize MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kinfolk_ecommerce';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('✓ MongoDB Connected Successfully to', MONGODB_URI);

    // Seed database if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding initial products into MongoDB...');
      await Product.insertMany(SEED_PRODUCTS);
    }
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      console.log('Seeding initial orders into MongoDB...');
      await Order.insertMany(SEED_ORDERS);
    }
  } catch (err) {
    isMongoConnected = false;
    console.warn('! MongoDB connection failed/timed out. Falling back gracefully to persistent in-memory store.');
    console.warn('  (Set MONGODB_URI in server/.env when ready to connect to a live MongoDB instance)');
  }
}

connectDB();

// Razorpay SDK Setup
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_kinfolk_demo';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'kinfolk_secret_demo';
let razorpayInstance = null;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    console.log('✓ Razorpay SDK initialized with live/test API keys');
  } else {
    console.log('! Razorpay running in simulated test sandbox mode (demo keys active)');
  }
} catch (e) {
  console.warn('Could not initialize Razorpay SDK:', e.message);
}

// Stripe SDK Setup
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_kinfolk_demo_public';
let stripeInstance = null;
if (STRIPE_SECRET_KEY) {
  try {
    stripeInstance = new Stripe(STRIPE_SECRET_KEY);
    console.log('✓ Stripe SDK initialized with secret key');
  } catch (e) {
    console.warn('Could not initialize Stripe SDK:', e.message);
  }
} else {
  console.log('! Stripe running in simulated test sandbox mode');
}

// ==========================================
// ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'KINFOLK & CO.',
    platform: 'MERN Stack Ecommerce Platform',
    database: isMongoConnected ? 'MongoDB (Connected)' : 'In-Memory High-Fidelity Store (Fallback Active)',
    paymentGateways: {
      razorpay: razorpayInstance ? 'Live / Test SDK Active' : 'Simulated Sandbox Active',
      stripe: stripeInstance ? 'Live / Test SDK Active' : 'Simulated Sandbox Active'
    },
    timestamp: new Date().toISOString()
  });
});

// Payment Configuration (Public keys for client)
app.get('/api/config/payments', (req, res) => {
  res.json({
    razorpayKeyId: RAZORPAY_KEY_ID,
    stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
    hasLiveRazorpay: !!razorpayInstance,
    hasLiveStripe: !!stripeInstance
  });
});

// Products: List All
app.get('/api/products', async (req, res) => {
  try {
    if (isMongoConnected) {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json(products);
    }
    res.json(memoryProducts);
  } catch (err) {
    res.json(memoryProducts);
  }
});

// Products: Get Single by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const product = await Product.findOne({ id });
      if (product) return res.json(product);
    }
    const found = memoryProducts.find((p) => p.id === req.params.id);
    if (!found) return res.status(404).json({ error: 'Product not found' });
    res.json(found);
  } catch (err) {
    const found = memoryProducts.find((p) => p.id === req.params.id);
    if (!found) return res.status(404).json({ error: 'Product not found' });
    res.json(found);
  }
});

// Products: Add Review
app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { author, rating, text } = req.body;

    if (!author || !rating || !text) {
      return res.status(400).json({ error: 'Author, rating, and review text are required.' });
    }

    const newReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      author: author.trim(),
      date: 'Just now',
      rating: Number(rating),
      text: text.trim(),
      verified: true
    };

    if (isMongoConnected) {
      const product = await Product.findOne({ id });
      if (product) {
        product.reviews.unshift(newReview);
        const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
        product.rating = Number((totalRating / product.reviews.length).toFixed(1));
        product.reviewCount = product.reviews.length;
        await product.save();
        return res.status(201).json({ message: 'Review added', product });
      }
    }

    // Fallback store
    const idx = memoryProducts.findIndex((p) => p.id === id);
    if (idx !== -1) {
      memoryProducts[idx].reviews.unshift(newReview);
      const totalRating = memoryProducts[idx].reviews.reduce((sum, r) => sum + r.rating, 0);
      memoryProducts[idx].rating = Number((totalRating / memoryProducts[idx].reviews.length).toFixed(1));
      memoryProducts[idx].reviewCount = memoryProducts[idx].reviews.length;
      return res.status(201).json({ message: 'Review added', product: memoryProducts[idx] });
    }

    res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review', details: err.message });
  }
});

// Orders: Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      items,
      subtotal,
      discount = 0,
      shippingCost = 0,
      total,
      giftWrap = false,
      giftNote = '',
      shippingAddress,
      paymentMethod = 'razorpay',
      paymentStatus = 'paid',
      paymentId = ''
    } = req.body;

    if (!items || items.length === 0 || !shippingAddress || !total) {
      return res.status(400).json({ error: 'Missing required order details.' });
    }

    const orderId = `KC-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `TRK-${Math.floor(10000 + Math.random() * 90000)}-${(shippingAddress.country || 'US').substring(0, 2).toUpperCase()}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const orderData = {
      orderId,
      trackingNumber,
      date,
      status: 'Preparing in Studio',
      estimatedDelivery: '4–6 Business Days',
      subtotal: Number(subtotal),
      discount: Number(discount),
      shippingCost: Number(shippingCost),
      total: Number(total),
      giftWrap: Boolean(giftWrap),
      giftNote: giftWrap ? giftNote : '',
      paymentMethod,
      paymentStatus,
      paymentId: paymentId || `pay_${Date.now()}`,
      shippingAddress,
      items
    };

    // Deduct stock in DB / memory
    if (isMongoConnected) {
      for (const item of items) {
        await Product.findOneAndUpdate(
          { id: item.id },
          { $inc: { stock: -item.qty } }
        );
      }
      const savedOrder = await Order.create(orderData);
      return res.status(201).json({ success: true, order: savedOrder });
    }

    // Memory Store deduction
    for (const item of items) {
      const prod = memoryProducts.find((p) => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.qty);
      }
    }
    memoryOrders.unshift(orderData);
    res.status(201).json({ success: true, order: orderData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// Orders: List Orders
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    }
    res.json(memoryOrders);
  } catch (err) {
    res.json(memoryOrders);
  }
});

// Orders: Track by Tracking Number or Order ID
app.get('/api/orders/track/:query', async (req, res) => {
  try {
    const q = req.params.query.trim().toUpperCase();
    if (isMongoConnected) {
      const order = await Order.findOne({
        $or: [{ orderId: q }, { trackingNumber: q }]
      });
      if (order) return res.json(order);
    }

    const found = memoryOrders.find(
      (o) => o.orderId.toUpperCase() === q || o.trackingNumber.toUpperCase() === q
    );
    if (!found) return res.status(404).json({ error: 'Order not found for reference ' + q });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: 'Tracking lookup failed' });
  }
});

// Contact Concierge: Submit Inquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { inquiryType, fullName, email, reference, message } = req.body;

    if (!inquiryType || !fullName || !email || !message) {
      return res.status(400).json({ error: 'Inquiry type, name, email, and message are required.' });
    }

    const referenceId = `KC-CON-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiryData = {
      referenceId,
      inquiryType,
      fullName: fullName.trim(),
      email: email.trim(),
      reference: (reference || '').trim(),
      message: message.trim(),
      status: 'New',
      createdAt: new Date()
    };

    if (isMongoConnected) {
      const saved = await Contact.create(inquiryData);
      return res.status(201).json({
        success: true,
        referenceId,
        message: 'Your inquiry has been registered with the atelier concierge.',
        inquiry: saved
      });
    }

    memoryInquiries.unshift(inquiryData);
    res.status(201).json({
      success: true,
      referenceId,
      message: 'Your inquiry has been registered with the atelier concierge.',
      inquiry: inquiryData
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record inquiry', details: err.message });
  }
});

// Contact Concierge: List Inquiries
app.get('/api/contact', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Contact.find().sort({ createdAt: -1 });
      return res.json(list);
    }
    res.json(memoryInquiries);
  } catch (err) {
    res.json(memoryInquiries);
  }
});

// Newsletter / Journal Subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }
  memorySubscribers.push({ email, date: new Date() });
  res.json({ success: true, message: 'Subscribed to KINFOLK & CO. Slow Living Monographs.' });
});

// ==========================================
// PAYMENT GATEWAYS: RAZORPAY & STRIPE
// ==========================================

// Razorpay: Create Order
app.post('/api/payments/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency = 'USD', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Order amount is required.' });
    }

    // Convert amount to subunit (cents / paise)
    const amountInSubunits = Math.round(Number(amount) * 100);

    // If live/test Razorpay instance is available
    if (razorpayInstance) {
      const options = {
        amount: amountInSubunits,
        currency: currency.toUpperCase(),
        receipt: receipt || `rcpt_${Date.now()}`,
        payment_capture: 1
      };

      const order = await razorpayInstance.orders.create(options);
      return res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: RAZORPAY_KEY_ID,
        isLive: true
      });
    }

    // Fallback: Realistic Sandbox Order for smooth demonstration without requiring live banking credentials
    const sandboxOrder = {
      id: `order_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      key: RAZORPAY_KEY_ID,
      isLive: false,
      status: 'created'
    };

    res.json(sandboxOrder);
  } catch (err) {
    console.error('Razorpay Create Order Error:', err);
    res.status(500).json({ error: 'Failed to initialize Razorpay order', details: err.message });
  }
});

// Razorpay: Verify Payment Signature
app.post('/api/payments/razorpay/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ error: 'Missing payment signature verification details' });
    }

    // If live credentials provided, compute HMAC SHA256
    if (razorpayInstance && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature === razorpay_signature) {
        return res.json({ success: true, verified: true, paymentId: razorpay_payment_id });
      } else {
        return res.status(400).json({ success: false, verified: false, error: 'Signature mismatch' });
      }
    }

    // Sandbox / Test verification
    res.json({
      success: true,
      verified: true,
      mode: 'sandbox',
      paymentId: razorpay_payment_id
    });
  } catch (err) {
    res.status(500).json({ error: 'Verification failed', details: err.message });
  }
});

// Stripe: Create Payment Intent
app.post('/api/payments/stripe/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const amountInCents = Math.round(Number(amount) * 100);

    // If Stripe live/test SDK active
    if (stripeInstance) {
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: amountInCents,
        currency: currency.toLowerCase(),
        automatic_payment_methods: { enabled: true }
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
        publishableKey: STRIPE_PUBLISHABLE_KEY,
        isLive: true
      });
    }

    // Fallback: Sandbox payment intent with realistic simulation
    const simulatedId = `pi_demo_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    res.json({
      clientSecret: `${simulatedId}_secret_${Math.random().toString(36).substring(2, 10)}`,
      id: simulatedId,
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      isLive: false,
      mode: 'sandbox'
    });
  } catch (err) {
    console.error('Stripe Create Payment Intent Error:', err);
    res.status(500).json({ error: 'Failed to create Stripe payment intent', details: err.message });
  }
});

// Stripe: Confirm Payment
app.post('/api/payments/stripe/confirm-payment', (req, res) => {
  const { paymentIntentId } = req.body;
  res.json({
    success: true,
    status: 'succeeded',
    paymentId: paymentIntentId || `ch_${Date.now()}`,
    confirmedAt: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` KINFOLK & CO. MERN API SERVER RUNNING ON PORT ${PORT} `);
  console.log(` Local URL: http://localhost:${PORT}/api/health         `);
  console.log(`=======================================================`);
});
