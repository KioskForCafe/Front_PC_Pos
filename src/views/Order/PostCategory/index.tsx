import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { useNavigationStore, useStoreStore } from '../../../stores'
import axios, { AxiosResponse } from 'axios';
import { PostCategoryReqeustDto } from '../../../apis/request/category';
import { POST_CATEGORY_URL, authorizationHeader } from '../../../constants/api';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../../apis/response';
import { PostCategoryResponseDto } from '../../../apis/response/category';
import { Navigation } from '../../../constants/navigationEnum';

export default function PostCategory() {

  const {store} = useStoreStore();
  const {setNavigation} = useNavigationStore();

  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryPriority, setCategoryPriority] = useState<number>(999);

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

  const onAddCategoryButtonHandler = () =>{
    
    const data : PostCategoryReqeustDto = {
      categoryName,categoryPriority,storeId:store!.storeId
    }
    
    axios.post(POST_CATEGORY_URL, data , authorizationHeader(accessToken))
    .then((response)=>onAddCategoryResponseHandler(response))
    .catch((error)=>onAddCategoryErrorHandler(error))
  }

  const onAddCategoryResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data,message,result} = response.data as ResponseDto<PostCategoryResponseDto>
    if(!result || !data){
      alert(message);
      return;
    }
    setNavigation(Navigation.Order)
  }

  const onAddCategoryErrorHandler = (error: any) => {
    console.log(error.message);
  }


  return (
    <Box sx={{display:'flex', flexDirection:'column', height:'88vh'}}>
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
            <InputLabel>카테고리 이름</InputLabel>
            <Input onChange={(event)=>setCategoryName(event.target.value)} type='text'/>
        </FormControl>
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
            <InputLabel>카테고리 순위</InputLabel>
            <Input value={categoryPriority} onChange={(event)=>setCategoryPriority(Number(event.target.value))} type='number'/>
            <FormHelperText sx={{color:'orange'}}>순위가 낮은 번호가 앞으로 표시됩니다.</FormHelperText>
        </FormControl>
        <Button onClick={()=>onAddCategoryButtonHandler()}>카테고리 추가</Button>
    </Box>
  )
}
