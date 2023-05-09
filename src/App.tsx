import React from 'react';
import logo from './logo.svg';
import CustomMenu from './views/CustomMenu';
import './App.css';
import { Box } from '@mui/material';
import Footer from './views/Footer';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './views/NavigationBar';
import OrderLog from './views/OrderLog';
import Order from './views/Order';
import AnalysisView from './views/AnalysisView';
import Point from './views/Point';
import Store from './views/Store';
import SignIn from './views/SignIn';

function App() {
  return (
    <Box>
      <NavigationBar/>
      <Box sx={{flex:1}}>
        {/* <Order/> */}
        {/* <CustomMenu/> */}
        {/* <OrderLog/> */}
        {/* <AnalysisView/> */}
        {/* <Point/> */}
        {/* <Store/> */}
        <SignIn/>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
