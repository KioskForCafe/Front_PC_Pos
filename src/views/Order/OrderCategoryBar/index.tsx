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
import { useCategoryStore, useNavigationStore, useStoreStore, useCategoryListStore } from '../../../stores';
import CategoryButton from '../../../components/CategoryButton';
import usePagingHook from '../../../hooks/paging.hook';
import { Navigation } from '../../../constants/enum';

export default function OrderCategoryBar() {

    const [cookies] = useCookies();
    const {store} = useStoreStore();
    const {setCategory} = useCategoryStore();
    const {setNavigation} = useNavigationStore();
    const {categoryList, setCategoryList} = useCategoryListStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const {setList ,viewList, pageNumber, onPageHandler, COUNT} = usePagingHook(4);
    const storeMenuOpen = Boolean(anchorEl);
    
    const accessToken = cookies.accessToken;
    const storeId = store?.storeId;

    const onCategoryMenuButtonHandler = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onCategoryMenuCloseHandler = () => {
        setAnchorEl(null);
    };

    const onPrevPageButtonHandler = () => {
        if(pageNumber <=1) return;
        onPageHandler(pageNumber-1);
    }
    
    const onNextPageButtonHandler = () => {
        if(categoryList.length <= (COUNT * pageNumber)) return;
        onPageHandler(pageNumber+1);
    }


    const getCategory = (accessToken: string) =>{
        axios.get(GET_CATEGORY_LIST_URL(storeId+''), authorizationHeader(accessToken))
        .then((response) => getCategoryResponseHandler(response))
        .catch((error) => getCategoryErrorHandler(error))
    }

    const getCategoryResponseHandler = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<GetCategoryResponseDto[]>
        if(!data || !result){
            console.log(message);
            return;
        }
        setCategoryList(data);
        setList(data);
        setCategory(data[0]);
    }

    const getCategoryErrorHandler = (error: any) =>{
        console.log(error.message)
    }

    useEffect(()=>{
        getCategory(accessToken);
        console.log(viewList.map(v=>console.log(v)))
    },[])

  return (
    <Box sx={{display:'flex',width:'100%', height:'3rem'}}>
        { 
            categoryList.length !== 0 ? viewList.map((item)=>(
                // todo : 배열의 빈값을 확인하는 방법을 모르겠음..
                item === undefined || item === null ? <Button sx={{flex:1}}>왜안돼</Button> : <CategoryButton item={item as GetCategoryResponseDto}/>
            ))
            : '카테고리를 등록하세요'
        }
        <Box sx={{display:'flex', alignItems:'center', borderLeft:'1px solid #E6E8EB'}}>
            {   pageNumber > 1 &&
                <IconButton onClick={()=>onPrevPageButtonHandler()} sx={{flex:1}}>
                    <KeyboardArrowLeftIcon/>
                </IconButton>
            }
            {   categoryList.length > (COUNT * pageNumber) &&
                <IconButton onClick={()=>onNextPageButtonHandler()} sx={{flex:1}}>
                    <KeyboardArrowRightIcon/>
                </IconButton>
            }
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
            <MenuItem onClick={()=>setNavigation(Navigation.PatchCategory)}>수정 및 삭제</MenuItem>
        </Menu>

        
    </Box>
  )
}
