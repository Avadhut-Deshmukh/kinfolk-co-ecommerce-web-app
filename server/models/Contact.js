import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  referenceId: { type: String, required: true, unique: true },
  inquiryType: {
    type: String,
    required: true,
    enum: [
      'Order & Dispatch Support',
      'Architect / Interior Trade Program',
      'Private Showroom Appointment',
      'Press & Editorial',
      'General Inquiry'
    ]
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  reference: { type: String, default: '' },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['New', 'Under Review', 'Responded'],
    default: 'New'
  }
}, { timestamps: true });

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

