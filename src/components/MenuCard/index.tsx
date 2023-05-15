import { Box, Grid } from '@mui/material'
import React from 'react'
import { GetMenuResponseDto } from '../../apis/response/menu';

interface Props{
    menu : GetMenuResponseDto;
}

export default function MenuCard({menu}:Props) {
  return (
    <Grid item xs={4} md={3} lg={2.4}>
        <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'white', width:'8rem', height:'8rem', borderRadius:'0.5rem'}}>
            <Box sx={{p:'10px'}}>{menu.menuName}</Box>
            <Box sx={{p:'10px'}}>{menu.menuPrice}</Box>
        </Box>
    </Grid>
 
    )
}
