import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Order {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const ViewOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/viewOrders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/deleteOrder/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEdit = (order: Order) => {
    setEditOrder(order);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!editOrder) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/updateOrder/${editOrder._id}`,
        editOrder
      );
      setOrders(
        orders.map((order) => (order._id === editOrder._id ? response.data.data : order))
      );
      setOpen(false);
      setEditOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editOrder) {
      setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
        View Orders Page
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 3, textTransform: 'none', alignSelf: 'center' }}
        onClick={() => navigate('/productOrder')}
      >
        Back to Product Order
      </Button>
      <Box
        sx={{
          height: '600px',
          width: '600px',
          mt: '20px',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          p: 2,
          backgroundColor: 'white',
          borderRadius: '10px',
        }}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order._id}
              sx={{
                mb: '20px',
                p: 2,
                backgroundColor: 'black',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                color: 'white',
              }}
            >
              <Box>
                <img
                  src={order.imageUrl}
                  alt={order.name}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: 'orange' }}>
                  {order.name}
                </Typography>
                <Typography>
                  <strong>Price:</strong> ${order.price}
                </Typography>
                <Typography>
                  <strong>Quantity:</strong> {order.quantity}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  sx={{
                    backgroundColor: 'orange',
                    textTransform: 'none',
                    color:'white',
                    '&:hover': { backgroundColor: '#ff9800' },
                  }}
                  onClick={() => handleEdit(order)}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'red',
                    textTransform: 'none',
                    color:'white',
                    '&:hover': { backgroundColor: '#d32f2f' },
                  }}
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography>No orders to display</Typography>
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="name"
            value={editOrder?.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            value={editOrder?.price || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            type="number"
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={editOrder?.quantity || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            type="number"
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={editOrder?.imageUrl || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'white',textTransform:'none'}}  onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button  sx={{color:'white',textTransform:'none'}} onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewOrder;
