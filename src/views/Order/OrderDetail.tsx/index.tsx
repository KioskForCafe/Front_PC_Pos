import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export default function OrderDetail() {
  return (
    <Box sx={{ display:'flex', flexDirection:'column', flex:2}}>
        <Box sx={{height: '4rem'}}>옵션기능</Box>
        <Box sx={{display:'flex', flexDirection:'column', p:'20px', flex:1}}>
            <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                <Typography sx={{flex:2}}>상품명</Typography>
                <Box sx={{flex:1}}>Count</Box>
                <Typography sx={{flex:1, textAlign:'end'}}>가격</Typography>
            </Box>

        </Box>
        <Box sx={{display:'flex', height: '4rem'}}>
            <Button sx={{flex:4}}>결제</Button>
            <Button sx={{flex:1}}>금액입력</Button>
        </Box>

    </Box>
  )
}
