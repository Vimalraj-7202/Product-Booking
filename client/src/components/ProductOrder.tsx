import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import axios from 'axios';

const ProductOrder: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [toast, setToast] = useState<{
    open: boolean;
    type: 'success' | 'error';
    text: string;
  }>({ open: false, type: 'success', text: '' });
  const [showBurst, setShowBurst] = useState(false);

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const orderProduct = async () => {
    if (!name || !price || !quantity || !imageUrl) {
      setToast({ open: true, type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      await axios.post('http://localhost:5000/productOrder', {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        imageUrl,
      });
      setToast({
        open: true,
        type: 'success',
        text: 'Product ordered successfully!',
      });
      setName('');
      setPrice('');
      setQuantity('');
      setImageUrl('');

      // Show burst animation
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 1500); // Hide after 1.5 seconds
    } catch (error) {
      setToast({
        open: true,
        type: 'error',
        text: 'Error in ordering product. Please try again.',
      });
      console.error('Error in ordering product:', error);
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
        height: '60vh',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', mt: '100px' }}>
        Product Order Page
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          mt: '30px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Image URL"
              variant="outlined"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          onClick={orderProduct}
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            mt: '20px',
          }}
        >
          Place Order
        </Button>
      </Box>

      {/* Success/Error Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.type}
          sx={{
            width: '100%',
            animation: 'fade-in 0.5s ease-in-out',
            '@keyframes fade-in': {
              '0%': { opacity: 0, transform: 'translateY(-10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {toast.text}
        </Alert>
      </Snackbar>

      {/* Burst Animation */}
      {showBurst && (
        <>
          {/* Radial Glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, #ffcc00, transparent)',
              borderRadius: '50%',
              animation: 'burst 1s ease-out',
              zIndex: 1,
              '@keyframes burst': {
                '0%': {
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(0)',
                },
                '100%': {
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(3)',
                },
              },
            }}
          />
          {/* Confetti */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              background: 'url("confetti.png") no-repeat center',
              backgroundSize: 'cover',
              animation: 'fade-in-out 1.5s ease-in-out',
              '@keyframes fade-in-out': {
                '0%': { opacity: 0 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0 },
              },
              zIndex: 2,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ProductOrder;
