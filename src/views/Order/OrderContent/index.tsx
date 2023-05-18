import { Box, Grid, IconButton, Typography } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios, { AxiosResponse } from 'axios';
import { GET_MENU_LIST_URL, authorizationHeader } from '../../../constants/api';
import { useCategoryStore, useStoreStore } from '../../../stores';
import ResponseDto from '../../../apis/response';
import { GetMenuResponseDto } from '../../../apis/response/menu';
import MenuCard from '../../../components/MenuCard';
import { useCookies } from 'react-cookie';
import { PostOrderDetailRequestDto } from '../../../apis/request/order';
import MenuDetailCard from '../../../components/MenuDetailCard';

export default function OrderContent() {

    const {store} = useStoreStore();
    const {category} = useCategoryStore();
    const [menuList, setMenuList] = useState<GetMenuResponseDto[] | null>(null);
    const [menuDetailView, setMenuDetailView] = useState<boolean>(false);

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    const getMenuList = (accessToken: string) =>{
        if(category !== null){
            axios
                .get(GET_MENU_LIST_URL(store?.storeId+'', category?.categoryId+''),authorizationHeader(accessToken))
                .then((response)=>getMenuListResponseHandler(response))
                .catch((error)=>getMenuListErrorHandler(error))
        }
    }

    const getMenuListResponseHandler = (response: AxiosResponse<any, any>) =>{
      const {data,message,result} = response.data as ResponseDto<GetMenuResponseDto[]>
      if(!result){
        console.log(message);
        return;
      }
      console.log(data);
      setMenuList(data);
    }

    const getMenuListErrorHandler = (error: any) =>{
      console.log(error.message);
    }

    useEffect(()=>{
        getMenuList(accessToken);
    },[category])

  return (
    <Box sx={{flex:1 ,display:'flex', flexDirection:'column', backgroundColor:'#E6E8EB'}}>
        <Typography sx={{p:'1rem'}}>총 9개</Typography>
        <Box sx={{flex:1, px:'1rem'}}>
            <Grid container rowSpacing={3} columnSpacing={1}>
                {
                    menuList !==null && 
                    menuList.map((menu)=>(
                        <MenuCard setMenuDetailView={setMenuDetailView} menu={menu}/>
                    ))
                }
                
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

        {
            menuDetailView && <MenuDetailCard setMenuDetailView={setMenuDetailView}/>
        }
    </Box>
  )
}
