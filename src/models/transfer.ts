import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cardId: {
    type: String,
    required: true,
  },
  cardImage: {
    type: String,
    required: false,
  },
  cardName: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Transfer ||
  mongoose.model('Transfer', transferSchema);