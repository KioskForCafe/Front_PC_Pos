import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { GET_CATEGORY_LIST_URL, POST_MENU_URL, authorizationHeader } from '../../../constants/api';
import { useNavigationStore, useStoreStore } from '../../../stores';
import ResponseDto from '../../../apis/response';
import { GetCategoryResponseDto } from '../../../apis/response/category';
import { useCookies } from 'react-cookie';
import { PostMenuResponseDto } from '../../../apis/response/menu';
import { PostMenuRequestDto } from '../../../apis/request/menu';
import { Navigation } from '../../../constants/navigationEnum';

interface Option{
  optionName : string;
  optionPrice : number;
}

export default function PostMenu() {

  const {store} = useStoreStore();
  const {setNavigation} = useNavigationStore();

  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<GetCategoryResponseDto[] | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null);
  const [menuName, setMenuName] = useState<string>('');
  const [menuPrice, setMenuPrice] = useState<number>(0);
  const [menuState] = useState<boolean>(false);
  const [menuImgUrl, setMenuImgUrl] = useState<string | null>(null);
  const [optionList, setOptionList] = useState<Option[]>([]);
  const [optionName,setOptionName] = useState<string>('');
  const [optionPrice,setOptionPrice] = useState<number>(0);

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;



  const getCategoryList = () =>{
    axios
      .get(GET_CATEGORY_LIST_URL(store?.storeId+''))
      .then((response)=>getCategoryListResponseHandler(response))
      .catch((error)=>getCategoryListErrorHandler(error))
  }

  const onCategorySelectChangeHandler = (event: SelectChangeEvent<string>) =>{
    setCategory(event.target.value);
    setCategoryId(Number(event.target.value));
  }

  const onAddMenuButtonHandler = () =>{

    const data : PostMenuRequestDto ={
      categoryId,menuName,menuPrice,menuImgUrl,menuState,optionList,storeId:store!.storeId
    }
    console.log(data)

    axios.post(POST_MENU_URL, data , authorizationHeader(accessToken))
    .then((response)=>onAddMenuResponseHandler(response))
    .catch((error)=> onAddMenuErrorHandler(error))

  }

  const getCategoryListResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data,message,result} = response.data as ResponseDto<GetCategoryResponseDto[]>
    if(!result){
      alert(message);
      return;
    }
    console.log(data);
    setCategoryList(data);

  }

  const onAddMenuResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data,message,result} = response.data as ResponseDto<PostMenuResponseDto>
    if(!result || !data){
      alert(message);
      return;
    }
    setNavigation(Navigation.Order);
  }

  const onAddOptionButtonHandler = () =>{
    optionList.push({optionName,optionPrice});
    setOptionList([...optionList]);
  }

  const getCategoryListErrorHandler = (error: any) =>{
    console.log(error.message);
  }

  const onAddMenuErrorHandler = (error: any) =>{
    console.log(error.message);
  }
  
  useEffect(()=>{
    getCategoryList();
  },[])

  return (
    <Box sx={{display:'flex', flexDirection:'column', height:'88vh'}}>
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
            <InputLabel>상품 이름</InputLabel>
            <Input onChange={(event)=>setMenuName(event.target.value)} type='text'/>
        </FormControl>
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
            <InputLabel>상품 가격</InputLabel>
            <Input onChange={(event)=>setMenuPrice(Number(event.target.value))} type='number'/>
        </FormControl>
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(event)=>onCategorySelectChangeHandler(event)}
          >
            {
              categoryList && categoryList.map((category)=>(
                <MenuItem value={category.categoryId}>{category.categoryName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        {
          optionList.map((option)=>(
            <Box>
              <Box>{option.optionName}</Box>
              <Box>{option.optionPrice}</Box>
            </Box>
          ))
        }
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
            <InputLabel>옵션 이름</InputLabel>
            <Input onChange={(event)=>setOptionName(event.target.value)} type='text'/>
        </FormControl>
        <FormControl variant='filled' sx={{mb:'0.5rem'}}>
            <InputLabel>옵션 가격</InputLabel>
            <Input onChange={(event)=>setOptionPrice(Number(event.target.value))} type='number'/>
        </FormControl>
        <Button onClick={()=>onAddOptionButtonHandler()} >옵션 추가</Button>

        <Button onClick={()=>onAddMenuButtonHandler()}>메뉴 추가</Button>
    </Box>
  )
}
