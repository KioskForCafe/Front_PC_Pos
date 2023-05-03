import React from 'react'
import CategoryBar from './CategoryBar'
import { Box, Container, Grid } from '@mui/material'
import styled from '@emotion/styled';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function CustomMenu() {
  return (
    <>
    <CategoryBar />
    <Box sx={{ flexGrow: 1, width: '50%', height:'100%', backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
      <Grid spacing={4} container>
        <Grid item>
          <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002407]_20210225095106743.jpg'/>
        </Grid>
        <Grid item>
          <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg'/>
        </Grid>
        <Grid item>
          <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/10/[9200000004312]_20221005145029134.jpg'/>
        </Grid>
        <Grid item>
          <Img alt='coffee' src='https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg'/>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}
