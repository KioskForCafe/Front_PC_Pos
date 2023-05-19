import React from 'react';
import CustomMenu from './views/CustomMenu';
import './App.css';
import { Box } from '@mui/material';
import Footer from './views/Footer';
import NavigationBar from './views/NavigationBar';
import OrderLog from './views/OrderLog';
import Order from './views/Order';
import AnalysisView from './views/AnalysisView';
import Store from './views/Store';
import AuthenticationView from './views/AuthenticationView';
import { useNavigationStore, useStoreStore, useUserStore } from './stores';
import PostStoreView from './views/Store/PostStoreView';
import PatchStoreView from './views/Store/PatchStoreView';
import { Navigation } from './constants/navigationEnum';
import PostMenu from './views/Order/PostMenu';
import PostCategory from './views/Order/PostCategory';

function App() {

  const {navigation} = useNavigationStore();

  const {user} = useUserStore();
  const {store} = useStoreStore();

  

  return (
    <Box>
      <NavigationBar />
      <Box sx={{flex:1}}>
        {
          navigation === Navigation.AuthenticationView ? <AuthenticationView/> :
          navigation === Navigation.Order ? <Order/> :
          navigation === Navigation.CustomMenu ? <CustomMenu/> :
          navigation === Navigation.OrderLog ? <OrderLog/> :
          navigation === Navigation.AnalysisView ? <AnalysisView/> :
          navigation === Navigation.Store ? <Store/> :
          navigation === Navigation.PostStoreView ? <PostStoreView/> :
          navigation === Navigation.PatchStoreView ? <PatchStoreView/> :
          navigation === Navigation.PostMenu ? <PostMenu/> :
          navigation === Navigation.PostCategory && <PostCategory/> 
        }
      </Box>
      {
        user && store && <Footer/>
      }
    </Box>
  );
}

export default App;
