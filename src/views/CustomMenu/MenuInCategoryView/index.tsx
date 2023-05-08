import { Box, Grid, Typography, styled } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '300px',
  });

export default function MenuInCategoryView() {
  return (
        <Box sx={{ p: '1vh', width: '65%', backgroundColor: 'rgba(0, 0, 0, 0.05)', height: '81vh', overflow:'auto' }}>
          <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Grid item xs={3} >
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ height: '30%' }}>
                <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg' />
                <Typography textAlign='center'>커피</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography>상품 추가</Typography><AddIcon />
              </Box>
            </Grid>
          </Grid>
        </Box>
  )
}
