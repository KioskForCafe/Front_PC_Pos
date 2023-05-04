import React from 'react';
import logo from './logo.svg';
import CustomMenu from './views/CustomMenu';
import './App.css';
import { Box } from '@mui/material';
import Footer from './views/Footer';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './views/NavigationBar';
import OrderLog from './views/OrderLog';

function App() {
  return (
    <Box>
      <NavigationBar/>
      <CustomMenu/>
      {/* <OrderLog/>
      <Routes>
        <Route path='/orderLog' element={(<OrderLog/>)}/>
      </Routes> */}
      <Footer />
    </Box>
  );
}

export default App;
