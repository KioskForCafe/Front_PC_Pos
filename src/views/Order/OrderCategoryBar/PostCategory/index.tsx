import { Box, Button, FormControl, FormHelperText, IconButton, Input, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigationStore, useStoreStore } from '../../../../stores'
import axios, { AxiosResponse } from 'axios';
import { PostCategoryReqeustDto } from '../../../apis/request/category';
import { POST_ALARM_URL, POST_CATEGORY_URL, authorizationHeader } from '../../../constants/api';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../../apis/response';
import { PostCategoryResponseDto } from '../../../apis/response/category';
import { Navigation, AlarmMessage } from '../../../constants/enum';
import CloseIcon from '@mui/icons-material/Close';
import { PostAlarmRequestDto } from '../../../apis/request/alarm';
import { PostAlarmResponseDto } from '../../../apis/response/alarm';

export default function PostCategory() {

  const {store} = useStoreStore();
  const {setNavigation} = useNavigationStore();

  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryPriority, setCategoryPriority] = useState<number>(999);

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

  //         Event Handler          //

  const onAddCategoryButtonHandler = () =>{

    if(!categoryName) {
      alert('카테고리 이름을 입력하세요');
      return;
    }
    
    const data : PostCategoryReqeustDto = {
      categoryName,categoryPriority,storeId:store!.storeId
    }
    
    axios.post(POST_CATEGORY_URL, data , authorizationHeader(accessToken))
    .then((response)=>onAddCategoryResponseHandler(response))
    .catch((error)=>onAddCategoryErrorHandler(error));

    postAlarm(accessToken);

  }

  const postAlarm = (accessToken: string) => {
    if (!accessToken) {
        alert('로그인이 필요합니다.')
        return;
    }

    if (store?.storeId == null) {
        alert('점포가 존재하지 않습니다.')
        return;
    }
    const data : PostAlarmRequestDto = {
        message: AlarmMessage.CATEGORY_REGISTER,
        isRead: false,
        createdAt: new Date(),    
        storeId: store.storeId
    }

    axios.post(POST_ALARM_URL, data, authorizationHeader(accessToken))
    .then((response) => postAlarmResponseHandler(response))
    .catch((error) => postAlarmErrorHandler(error));
}

   //              Response Handler                //

  const onAddCategoryResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data,message,result} = response.data as ResponseDto<PostCategoryResponseDto>
    if(!result || !data){
      alert(message);
      return;
    }
    setNavigation(Navigation.Order)
  }

  const postAlarmResponseHandler = (response: AxiosResponse<any, any>) => {
    const {data,message,result} = response.data as ResponseDto<PostAlarmResponseDto>
    if(!result || !data){
      alert(message);
      return;
    }
  }

  //          Error Handler           //

  const onAddCategoryErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const postAlarmErrorHandler = (error: any) => {
    console.log(error.message);
  }

  return (
    <Box sx={{display:'flex', height:'88vh', justifyContent:'center', alignItems:'center', overflow:'auto'}}>
      <Box sx={{position:'relative', display:'flex', flexDirection:'column', width:'350px'}}>
      <Typography variant='h4' marginBottom='10px' >메뉴 등록</Typography>
      <IconButton onClick={()=>setNavigation(Navigation.Order)} sx={{position:'absolute', right:0}}>
        <CloseIcon/>
      </IconButton>
        <FormControl variant='standard' sx={{mb:'0.5rem'}}>
            <InputLabel>카테고리 이름</InputLabel>
            <Input onChange={(event)=>setCategoryName(event.target.value)} type='text'/>
        </FormControl>
        <FormControl variant='standard' sx={{mb:'0.5rem'}}>
            <InputLabel>카테고리 순위</InputLabel>
            <Input value={categoryPriority} onChange={(event)=>setCategoryPriority(Number(event.target.value))} type='number'/>
            <FormHelperText sx={{color:'orange'}}>순위가 낮은 번호가 앞으로 표시됩니다.</FormHelperText>
        </FormControl>
        <Button variant='outlined' sx={{my:'2rem'}} onClick={()=>onAddCategoryButtonHandler()}>카테고리 추가</Button>
      </Box>
    </Box>
  )
}
