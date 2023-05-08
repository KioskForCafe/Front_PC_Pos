import { Box, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function OrderContent() {
  return (
    <Box sx={{flex:1 ,display:'flex', flexDirection:'column', backgroundColor:'#E6E8EB'}}>
        <Typography sx={{p:'1rem'}}>총 9개</Typography>
        <Box sx={{flex:1, px:'1rem'}}>
            <Grid container rowSpacing={3} columnSpacing={1}>
                <Grid item xs={4} md={3} lg={2.4}>
                    <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'white', width:'8rem', height:'8rem', borderRadius:'0.5rem'}}>
                        <Box sx={{p:'10px'}}>상품명</Box>
                        <Box sx={{p:'10px'}}>가격</Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{px: '1rem',height:'4rem', display:'flex', alignItems:'center'}}>
            <IconButton sx={{mx:'5px'}}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton sx={{mx:'5px'}}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>
    </Box>
  )
}
