import React from 'react';
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
import { Navigation } from './constants/enum';
import PostMenu from './views/Order/MenuDetail/PostMenu';
import PostCategory from './views/Order/OrderCategoryBar/PostCategory';
import PatchCategory from './views/Order/OrderCategoryBar/PatchCategory';
import AlarmView from './views/AlarmView';

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
          navigation === Navigation.OrderLog ? <OrderLog/> :
          navigation === Navigation.AnalysisView ? <AnalysisView/> :
          navigation === Navigation.Store ? <Store/> :
          navigation === Navigation.PostStoreView ? <PostStoreView/> :
          navigation === Navigation.PatchStoreView ? <PatchStoreView/> :
          navigation === Navigation.PostMenu ? <PostMenu/> :
          navigation === Navigation.PostCategory ? <PostCategory/> :
          navigation === Navigation.PatchCategory ? <PatchCategory/> :
          navigation === Navigation.AlarmView && <AlarmView /> 
        }
      </Box>
      {
        user && store && navigation !== Navigation.PatchStoreView && <Footer/> 
      }
    </Box>
  );
}

export default App;
