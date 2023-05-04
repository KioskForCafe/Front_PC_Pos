import React from 'react'
import CategoryBar from './CategoryBar'
import { Box, Card, Container, Grid, Icon, IconButton, Typography } from '@mui/material'
import styled from '@emotion/styled';

import MenuDetailView from './MenuDetailView';
import MenuInCategoryView from './MenuInCategoryView';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '300px',
});

export default function CustomMenu() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column' }}>
      <CategoryBar />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '83vh'}}>
        <MenuInCategoryView/>
        <Box sx={{ width: '35%', backgroundColor: 'white', height: '100%', overflow: 'auto' }}>
          <MenuDetailView />
        </Box>
      </Box>
    </Box>
  )
}
