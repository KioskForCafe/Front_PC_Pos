import { Backdrop, Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderCategoryBar from './OrderCategoryBar/';
import OrderContent from './OrderContent/';
import OrderDetail from './OrderDetail/';
import MenuDetailCard from './MenuDetail';
import PatchMenuDetail from './PatchMenuDetail';

export default function Order() {

  const [menuDetailView, setMenuDetailView] = useState<boolean>(false);
  const [editView, setEditView] = useState<boolean>(false);

  return (
    <Box sx={{position:'relative', display:'flex', height:'88vh'}}>
        
        <Box sx={{flexDirection:'column', display:'flex', flex:3, borderRight:'1px solid #E6E8EB'}}>
            <OrderCategoryBar/>
            <OrderContent setMenuDetailView={setMenuDetailView}/>
        </Box>
        <OrderDetail/>
        {
          menuDetailView && !editView && (<MenuDetailCard setEditView={setEditView} setMenuDetailView={setMenuDetailView}/>)
        }
        {
          editView && (<PatchMenuDetail setEditView={setEditView}/>)
        }
    </Box>
  )
}
