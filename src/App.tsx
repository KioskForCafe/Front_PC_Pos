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
import { useStoreStore, useUserStore } from './stores';
import PostStoreView from './views/Store/PostStoreView';
import PatchStoreView from './views/Store/PatchStoreView';

function App() {

  const [node , setNode] = useState<string>('AuthenticationView');

  const {user} = useUserStore();
  const {store} = useStoreStore();


  return (
    <Box>
      <NavigationBar />
      <Box sx={{flex:1}}>
        {
          node === 'AuthenticationView' ? <AuthenticationView setNode={setNode} /> :
          node === 'Order' ? <Order/> :
          node === 'CustomMenu' ? <CustomMenu/> :
          node === 'OrderLog' ? <OrderLog/> :
          node === 'AnalysisView' ? <AnalysisView/> :
          node === 'Store' ? <Store setNode={setNode}/> : 
          node === 'PostStoreView' ? <PostStoreView setNode={setNode} /> :
          node === 'PatchStoreView' && <PatchStoreView setNode={setNode} />
        }
        {/* <Order/> */}
        {/* <CustomMenu/> */}
        {/* <OrderLog/> */}
        {/* <AnalysisView/> */}
        {/* <Point/> */}
        {/* <Store/> */}
        
      </Box>
      {
        user && store && <Footer setNode={setNode}/>
      }
    </Box>
  );
}

export default App;
