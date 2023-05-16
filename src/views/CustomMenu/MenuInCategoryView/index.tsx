import { Box, Button, Grid, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import useStore from '../../../stores/user.store';
import { useCookies } from 'react-cookie';
import User from '../../../interfaces/User.interface';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../../apis/response';
import { GetMenuResponseDto } from '../../../apis/response/menu';
import { useNavigate } from 'react-router-dom';
import { GET_MENU_LIST_URL, authorizationHeader } from '../../../constants/api';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '300px',
});

export default function MenuInCategoryView() {

  const navigator = useNavigate();

  const [menuInCategoryResponse, setMenuInCategoryResponse] = useState<GetMenuResponseDto[] | null>(null);
  const [storeId, setStoreId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);

  const { user } = useStore();
  const [addUser, setAddUser] = useState<User | null>(null);

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;


  //         Event Handler          //
  const getMenuInCategory = (accessToken: string) => {
    if (!accessToken) {
      alert('로그인이 필요합니다.')
      return;
    }

    if (addUser?.userId !== user?.userId) {
      alert('권한이 없습니다.')
      return;
    }

    axios.get(GET_MENU_LIST_URL(storeId as number, categoryId as number), authorizationHeader(accessToken))
      .then((response) => getMenuInCategoryResponseHandler(response))
      .catch((error) => getMenuInCategoryErrorHandler(error));
  }

  //              Response Handler                //

  const getMenuInCategoryResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetMenuResponseDto[]>
    if (!result || !data) {
      alert(message);
      navigator('/');
      return;
    }
    setMenuInCategoryResponse(data);
  }

  //          Error Handler           //

  const getMenuInCategoryErrorHandler = (error: any) => {
    console.log(error.message);
  }

  //          Use Effect              //

  useEffect(() => {
    if (storeId && categoryId) getMenuInCategory(accessToken);
    console.log();
  }, [storeId, categoryId]);


  return (
    <Box sx={{ p: '1vh', width: '65%', backgroundColor: 'rgba(0, 0, 0, 0.05)', height: '81vh', overflow: 'auto' }}>
      <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }} >
        {menuInCategoryResponse?.map((menu) => (
          <Grid item xs={3} >
            <Box sx={{ height: '30%' }}>
              <Img alt='coffee' src={menu.menuImgUrl as string | undefined} />
              <Typography textAlign='center'>{menu.menuName}</Typography>
            </Box>
          </Grid>
        ))}
        {/* <Grid item xs={3} >
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
        </Grid> */}
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Button sx={{ width: '100%', height: '90%' }}>
              <Typography>상품 추가</Typography><AddIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
