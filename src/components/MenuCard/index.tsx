import { Box, Button, Grid } from '@mui/material'
import React, { Dispatch, useState } from 'react'
import { GetMenuDetailResponseDto, GetMenuResponseDto } from '../../apis/response/menu';
import axios, { AxiosResponse } from 'axios';
import { GET_MENU_DETAIL_URL } from '../../constants/api';
import { useMenuStore } from '../../stores';
import ResponseDto from '../../apis/response';

interface Props{
    menu : GetMenuResponseDto;
    setMenuDetailView: Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuCard({menu, setMenuDetailView}:Props) {

    const {setMenu} = useMenuStore();

    const onMenuDetailButtonHandler = () =>{
        axios
            .get(GET_MENU_DETAIL_URL(menu.menuId))
            .then((response)=>getMenuDetailResponseHandler(response))
            .catch((error)=>getMenuDetailErrorHandler(error))
    }

    const getMenuDetailResponseHandler = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<GetMenuDetailResponseDto>
        if(!data || !result){
            console.log(message);
            return;
        }
        const {...menu} = data;
        setMenu(menu);
        setMenuDetailView(true);
    }

    const getMenuDetailErrorHandler = (error: any) =>{
        console.log(error.message);
    }

  return (
    <Grid item xs={4} md={3} lg={2.4}>
        <Button onClick={()=>onMenuDetailButtonHandler()} sx={{display:'flex', flexDirection:'column', backgroundColor:'white', width:'8rem', height:'8rem', borderRadius:'0.5rem'}}>
            <Box sx={{p:'10px'}}>{menu.menuName}</Box>
            <Box sx={{p:'10px'}}>{menu.menuPrice}</Box>
        </Button>
    </Grid>
 
    )
}
