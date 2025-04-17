import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  imageUrl: {
      type: String,
      required: true
    }
}, {
  timestamps: true // createdAt, updatedAt
});

const OrderedProduct = mongoose.model('Orders', orderSchema);

export default OrderedProduct;
