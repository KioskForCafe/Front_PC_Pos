import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import SaleAnalysisView from '../SaleAnalysisView'
import AnalysisBusinessView from '../AnalysisBusinessView'
import AnalysisProductView from '../AnalysisProductView'

export default function AnalysisCategoryBar() {
  return (
    <Box>
      <List sx={{ height: '100%' }}>
        <ListItem>
          <ListItemButton onClick={SaleAnalysisView}>매출 분석</ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemButton onClick={AnalysisBusinessView}>영업 분석</ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemButton onClick={AnalysisProductView}>상품 분석</ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemButton>고객 분석</ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
