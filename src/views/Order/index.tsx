import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderCategoryBar from './OrderCategoryBar/';
import OrderContent from './OrderContent/';
import OrderDetail from './OrderDetail/';

export default function Order() {

  return (
    <Box sx={{display:'flex', height:'88vh'}}>
        <Box sx={{flexDirection:'column', display:'flex', flex:3, borderRight:'1px solid #E6E8EB'}}>
            <OrderCategoryBar/>
            <OrderContent/>
        </Box>
        <OrderDetail/>
    </Box>
  )
}
