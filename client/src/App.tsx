import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductOrder from './components/ProductOrder';
import ViewOrder from './components/ViewOrder';

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Buttons for navigation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          mt: '20px',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'orange',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/productOrder')}
        >
          Go to Product Order
        </button>
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'blue',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/viewOrder')}
        >
          Go to View Orders
        </button>
      </Box>

      {/* Routing */}
      <Routes>
        <Route path="/productOrder" element={<ProductOrder />} />
        <Route path="/viewOrder" element={<ViewOrder />} />
      </Routes>
    </Box>
  );
};

export default App;
