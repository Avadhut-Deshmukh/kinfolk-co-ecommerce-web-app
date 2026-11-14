import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, default: 'Just now' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  verified: { type: Boolean, default: true }
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subtitle: { type: String, default: '' },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 10 },
  badge: { type: String, default: null },
  material: { type: String, default: '' },
  dimensions: { type: String, default: '' },
  origin: { type: String, default: '' },
  care: { type: String, default: '' },
  description: { type: String, default: '' },
  images: [{ type: String }],
  reviews: [reviewSchema]
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

