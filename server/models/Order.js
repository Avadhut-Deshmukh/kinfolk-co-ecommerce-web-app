import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  image: { type: String, default: '' }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'United States' }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  trackingNumber: { type: String, required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    enum: ['Preparing in Studio', 'Dispatched', 'In Transit', 'Delivered'],
    default: 'Preparing in Studio'
  },
  estimatedDelivery: { type: String, default: '4–6 Business Days' },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  total: { type: Number, required: true },
  giftWrap: { type: Boolean, default: false },
  giftNote: { type: String, default: '' },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'stripe', 'cod', 'wire', 'upi'],
    default: 'razorpay'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'verified', 'failed'],
    default: 'paid'
  },
  paymentId: { type: String, default: '' },
  shippingAddress: { type: shippingAddressSchema, required: true },
  items: [orderItemSchema]
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

