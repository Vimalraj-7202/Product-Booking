import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import OrderedProduct from './config/models/product.model.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// GET /view ordered products
app.get('/viewOrders', async (req, res) => {
  try {
    const orders = await OrderedProduct.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

// POST /Order products
app.post('/productOrder', async (req, res) => {
  const { name, price, quantity, imageUrl } = req.body;

  // Validate input fields
  if (!name || typeof name !== 'string' || !price || !quantity) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields with valid data' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Price must be a positive number' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Quantity must be a positive number' });
  }

  try {
    const newProduct = new OrderedProduct({ name, price, quantity, imageUrl });
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error in Create Product:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /updateOrder/:id
app.put('/updateOrder/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, imageUrl } = req.body;

  try {
    const updatedOrder = await OrderedProduct.findByIdAndUpdate(
      id,
      { name, price, quantity, imageUrl },
      { new: true, runValidators: true } // Return the updated document and validate the data
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /deleteOrder/:id
app.delete('/deleteOrder/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await OrderedProduct.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start the server
const PORT = 5000;

app.listen(PORT, async () => {
  await connectDB(); // Ensure database connection is established
  console.log(`Server is running on port ${PORT}`);
});
