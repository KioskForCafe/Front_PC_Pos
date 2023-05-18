import { Box, Button, IconButton, Menu, MenuItem, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React, { MouseEvent, useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios, { AxiosResponse } from 'axios';
import { GET_CATEGORY_LIST_URL, authorizationHeader } from '../../../constants/api';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../../apis/response';
import { GetCategoryResponseDto } from '../../../apis/response/category';
import { useCategoryStore, useStoreStore } from '../../../stores';
import CategoryButton from '../../../components/CategoryButton';

export default function OrderCategoryBar() {

    const [cookies] = useCookies();
    const {store} = useStoreStore();
    const [categoryList, setCategoryList] = useState<GetCategoryResponseDto[] | null>(null);
    const {category, setCategory} = useCategoryStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const storeMenuOpen = Boolean(anchorEl);
    
    const accessToken = cookies.accessToken;
    const storeId = store?.storeId;
    
    const onCategoryMenuButtonHandler = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onCategoryMenuCloseHandler = () => {
        setAnchorEl(null);
    };


    const getCategory = (accessToken: string) =>{
        axios.get(GET_CATEGORY_LIST_URL(storeId+''), authorizationHeader(accessToken))
        .then((response) => getCategoryResponseHandler(response))
        .catch((error) => getCategoryErrorHandler(error))
    }

    const getCategoryResponseHandler = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<GetCategoryResponseDto[]>
        // todo : !data의 의미랑 !result의 의미랑 다른게 아닌지 확인
        if(!data || !result){
            console.log(message);
            return;
        }
        setCategoryList(data);
        setCategory(data[0]);
    }

    const getCategoryErrorHandler = (error: any) =>{
        console.log(error.message)
    }

    useEffect(()=>{
        getCategory(accessToken);
    },[])

  return (
    <Box sx={{display:'flex',width:'100%', height:'4rem'}}>
        { 
            categoryList !== null ? categoryList.map((category)=>(
                <CategoryButton category={category}/>
            ))
            : '카테고리를 등록하세요'
        }
        <Box sx={{display:'flex', alignItems:'center', borderLeft:'1px solid #E6E8EB'}}>
            <IconButton sx={{flex:1}}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton sx={{flex:1}}>
                <KeyboardArrowRightIcon/>
            </IconButton>
            <IconButton onClick={onCategoryMenuButtonHandler} sx={{flex:1}}>
                <MoreHorizIcon />
            </IconButton>
        </Box>
        
        <Menu 
            anchorEl={anchorEl}
            open={storeMenuOpen}
            onClose={onCategoryMenuCloseHandler}
            onClick={onCategoryMenuCloseHandler} 
        >
            <MenuItem onClick={onCategoryMenuCloseHandler}>수정</MenuItem>
            <MenuItem onClick={onCategoryMenuCloseHandler}>삭제</MenuItem>
        </Menu>

        
    </Box>
  )
}
