import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import OrderCategoryBar from './OrderCategoryBar.tsx';
import OrderContent from './OrderContent.tsx';
import OrderDetail from './OrderDetail.tsx';


export default function Order() {
  return (
    <Box sx={{display:'flex', height:'100%'}}>
        <Box sx={{flexDirection:'column', display:'flex', flex:3, borderRight:'1px solid #E6E8EB'}}>
            <OrderCategoryBar/>
            <OrderContent/>
        </Box>
        <OrderDetail/>
    </Box>
  )
}
