import React, { useState } from 'react';
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
import AuthenticationView from './views/AuthenticationView';

function App() {

  const [node , setNode] = useState<string>('AuthenticationView');

  return (
    <Box>
      <NavigationBar />
      <Box sx={{flex:1}}>
        {
          node === 'AuthenticationView' ? <AuthenticationView /> :
          node === 'Order' ? <Order/> :
          node === 'CustomMenu' ? <CustomMenu/> :
          node === 'OrderLog' ? <OrderLog/> :
          node === 'AnalysisView' ? <AnalysisView/> :
          node === 'Store' && <Store/>
        }
        {/* <Order/> */}
        {/* <CustomMenu/> */}
        {/* <OrderLog/> */}
        {/* <AnalysisView/> */}
        {/* <Point/> */}
        {/* <Store/> */}
        
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
