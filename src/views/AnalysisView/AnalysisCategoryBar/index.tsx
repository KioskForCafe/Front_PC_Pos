import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

export default function AnalysisCategoryBar() {
  return (
    <Box>
      <List sx={{ height: '100%' }}>
        <ListItem>
          <ListItemButton>매출 분석</ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemButton>영업 분석</ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemButton>상품 분석</ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemButton>고객 분석</ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
