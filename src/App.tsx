import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import Footer from './views/Footer';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './views/NavigationBar';
import OrderLog from './views/OrderLog';

function App() {
  return (
    <Box sx={{ display:'flex', height: '100vh' }}>
      <NavigationBar/>
      <OrderLog/>
      <Routes>
        <Route path='/orderLog' element={(<OrderLog/>)}/>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
