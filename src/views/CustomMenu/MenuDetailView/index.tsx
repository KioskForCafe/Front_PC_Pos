import { Box, Button, Divider, Grid, Typography, styled } from '@mui/material'
import React from 'react'

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function MenuDetailView() {
  return (
    <Box sx={{ height: '82vh'}}>
            <Box sx={{p: '60px',display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{p: '20px'}}>
        <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg'/>
        </Box>
        <Box sx={{p: '30px', flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: '45px'}}>메뉴이름</Typography>
                    <Divider/>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex'}}>
                    <Typography sx={{fontSize: '30px'}}>가격</Typography>
                    <Typography sx={{marginLeft: 'auto', fontSize: '30px' }}>1000원</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{fontSize: '30px'}}>옵션</Typography>
                    <Box sx={{display: 'flex'}}>
                          <Typography sx={{ fontSize: '20px' }}>샷추가</Typography>
                          <Typography sx={{ ml: 'auto',fontSize: '20px' }}>500원</Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                          <Typography sx={{ fontSize: '20px' }}>연하게</Typography>
                          <Typography sx={{ ml: 'auto',fontSize: '20px' }}>0원</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{p: '10px', display: 'flex', width: '100%', flexGrow: 1}}>
            <Button variant='contained' sx={{ flexGrow: 1, height: '100px',backgroundColor: '#5c5c5c', color: '#ffffff', fontSize: '30px'}}>수정</Button>
            <Button variant='outlined' sx={{ outlineColor: '#5c5c5c', color: '#5c5c5c', flexGrow: 1, height: '100px', fontSize: '30px'}}>삭제</Button>
        </Box>
    </Box>
    </Box>

  )
}
