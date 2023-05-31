import { Box, Button, Divider, FormControl, FormHelperText, IconButton, Input, InputLabel, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { useCategoryListStore, useNavigationStore } from '../../../../stores';
import { Navigation } from '../../../../constants/enum';
import Category from '../../../../interfaces/Category.interface';
import axios, { AxiosResponse } from 'axios';
import { PatchCategoryRequestDto } from '../../../../apis/request/category';
import { DELETE_CATEGORY_URL, PATCH_CATEGORY_URL, authorizationHeader } from '../../../../constants/api';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../../../apis/response';
import { DeleteCategoryResponseDto, PatchCategoryResponseDto } from '../../../../apis/response/category';

export default function PatchCategory() {

  const {setNavigation} = useNavigationStore();
  const {categoryList, setCategoryList} = useCategoryListStore();
  const [category, setCategory] = useState<Category>(categoryList[0]);
  const [categoryName, setCategoryName] = useState<string>(category.categoryName);
  const [categoryPriority, setCategoryPriority] = useState<number>(category.categoryPriority);

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

  const onCategorySelectButtonHandler = (category : Category) => {
    setCategory(category);
    setCategoryName(category.categoryName);
    setCategoryPriority(category.categoryPriority);
  }

  const onDeleteCategoryButtonHandler = () => {
    axios
      .delete(DELETE_CATEGORY_URL(category.categoryId), authorizationHeader(accessToken))
      .then((response)=> onDeleteCategoryResponseHandler(response))
      .catch((error)=>onDeleteCategoryErrorHandler(error))
  }

  const onUpdateCategoryButtonHandler = () => {

    const data: PatchCategoryRequestDto = {
      categoryId:category.categoryId,
      categoryName,
      categoryPriority
    }

    axios
      .patch(PATCH_CATEGORY_URL, data, authorizationHeader(accessToken))
      .then((response)=> onUpdateCategoryResponseHandler(response))
      .catch((error)=>onUpdateCategoryErrorHandler(error))
  }

  const onDeleteCategoryResponseHandler = (response: AxiosResponse<any, any>) => {
    const {data,message,result} = response.data as ResponseDto<DeleteCategoryResponseDto[]>
    if(!result || !data){
      alert(message);
      return;
    }
    setCategoryList(data);
  }

  const onUpdateCategoryResponseHandler = (response: AxiosResponse<any, any>) => {
    const {data,message,result} = response.data as ResponseDto<PatchCategoryResponseDto[]>;
    if(!result || !data){
      alert(message);
      return;
    }
    setCategoryList(data);
  }

  const onDeleteCategoryErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const onUpdateCategoryErrorHandler = (error: any) => {
    console.log(error.message);
  }

  return (
    <Box sx={{display:'flex', height:'88vh', justifyContent:'center', alignItems:'center'}}>
      <Box sx={{position:'relative', display:'flex', flexDirection:'column', width:'350px'}}>
        <Typography variant='h4' marginBottom='10px' >카테고리 수정</Typography>
        <IconButton onClick={()=>setNavigation(Navigation.Order)}  sx={{position:'absolute', right:0}}>
          <CloseIcon/>
        </IconButton>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
          <Box sx={{flex:1}}>
            <Typography textAlign='center'>카테고리 목록</Typography>
            {categoryList.map((category)=>(
              <Button sx={{width:'100%'}} onClick={()=>onCategorySelectButtonHandler(category)}>{category.categoryName}</Button>
            ))}
          </Box>
          <Divider sx={{mx:'10px'}} orientation="vertical" flexItem variant="middle"/>
          <Box sx={{flex:1}}>
            <Box>
              <FormControl variant='standard' sx={{display:'inline-flex'}}>
                  <InputLabel>카테고리 이름</InputLabel>
                  <Input value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} type='text'/>
              </FormControl>
            </Box>
            <Box>
              <FormControl variant='standard' sx={{display:'inline-flex'}}>
                  <InputLabel>카테고리 우선순위</InputLabel>
                  <Input value={categoryPriority} onChange={(event)=>setCategoryPriority(Number(event.target.value))} type='number'/>
              </FormControl>
            </Box>
            <Button onClick={()=>onUpdateCategoryButtonHandler()}>수정하기</Button>
            <Button onClick={()=>onDeleteCategoryButtonHandler()}>삭제하기</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
