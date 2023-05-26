import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FILE_UPLOAD_URL, GET_CATEGORY_LIST_URL, POST_MENU_URL, authorizationHeader, mutipartHeader } from '../../../constants/api';
import { useNavigationStore, useStoreStore } from '../../../stores';
import ResponseDto from '../../../apis/response';
import { GetCategoryResponseDto } from '../../../apis/response/category';
import { useCookies } from 'react-cookie';
import { PostMenuResponseDto } from '../../../apis/response/menu';
import { PostMenuRequestDto } from '../../../apis/request/menu';
import { Navigation } from '../../../constants/enum';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface Option{
  optionName : string;
  optionPrice : number;
}

export default function PostMenu() {

  const {store} = useStoreStore();
  const {setNavigation} = useNavigationStore();
  const menuImageRef = useRef<HTMLInputElement | null>(null);

  const [menuImgUrl, setMenuImgUrl] = useState<string>('');
  const [patchOptionView , setPatchOptionView] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<GetCategoryResponseDto[] | null>(null);
  const [categoryId, setCategoryId] = useState<number|null>(null);
  const [menuName, setMenuName] = useState<string>('');
  const [menuPrice, setMenuPrice] = useState<number>(0);
  const [menuState] = useState<boolean>(false);
  const [optionList, setOptionList] = useState<Option[]>([]);
  const [optionName,setOptionName] = useState<string>('');
  const [optionPrice,setOptionPrice] = useState<number | string>('');

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

  const onMenuImageUploadButtonHandler = () => {
    if (!menuImageRef.current) return;
    menuImageRef.current.click();
  }

  const onMenuImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const data = new FormData();
    data.append('file', event.target.files[0]);

    axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
        .then((response) => menuImageUploadResponseHandler(response))
        .catch((error) => menuImageUploadErrorHandler(error));
}

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

    if(!menuName || !menuPrice) {
      alert('상품이름,가격을 입력하세요');
      return;
    }

    const data : PostMenuRequestDto ={
      categoryId,menuName,menuPrice,menuImgUrl,menuState,optionList,storeId:store!.storeId
    }

    axios.post(POST_MENU_URL, data , authorizationHeader(accessToken))
    .then((response)=>onAddMenuResponseHandler(response))
    .catch((error)=> onAddMenuErrorHandler(error))

  }

  const onAddOptionButtonHandler = () => {
    if(!optionName) return alert('옵션이름을 입력해주세요.');
    optionList.push({optionName,optionPrice: optionPrice as number});
    setOptionList([...optionList]);
    setOptionName('');
    setOptionPrice('');
  }

  const onDeleteOptionButtonHandler = (index: number) => {
    optionList.splice(index,1);
    setOptionList([...optionList]);
  }

  const menuImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
    const imageUrl = response.data as string;
    if (!imageUrl) return;
    setMenuImgUrl(imageUrl);
}

  const getCategoryListResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data,message,result} = response.data as ResponseDto<GetCategoryResponseDto[]>
    if(!result){
      alert(message);
      return;
    }
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

  const menuImageUploadErrorHandler = (error: any) => {
    console.log(error.message);
}

  const getCategoryListErrorHandler = (error: any) => {
    console.log(error.message);
  }

  const onAddMenuErrorHandler = (error: any) =>{
    console.log(error.message);
  }
  
  useEffect(()=>{
    getCategoryList();
  },[])

  return (
    <Box sx={{display: 'flex',height:'88vh', justifyContent:'center', alignItems:'center'}}>
      <Box sx={{position:'relative', display:'flex', flexDirection:'column', width:'350px'}}>
        <Typography variant='h4' marginBottom='10px' >메뉴 등록</Typography>
        <IconButton onClick={()=>setNavigation(Navigation.Order)} sx={{position:'absolute', right:0}}>
          <CloseIcon/>
        </IconButton>
        <FormControl variant='standard' sx={{mb:'0.5rem'}}>
            <InputLabel>상품 이름</InputLabel>
            <Input onChange={(event)=>setMenuName(event.target.value)} type='text'/>
        </FormControl>
        <FormControl variant='standard' sx={{mb:'0.5rem'}}>
            <InputLabel>상품 가격</InputLabel>
            <Input onChange={(event)=>setMenuPrice(Number(event.target.value))} type='number'/>
        </FormControl>
        <FormControl variant='standard' sx={{mb:'0.5rem'}}>
            <Input value='상품 이미지' type='text' readOnly endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => onMenuImageUploadButtonHandler()}>
                  <ImageOutlinedIcon />
                  <input ref={menuImageRef} hidden type='file' accept='image/*' onChange={(event) => onMenuImageUploadChangeHandler(event)} />
                </IconButton>
              </InputAdornment>
              }
            />
        </FormControl>
        <Box display='flex' justifyContent='center'>
          <Box sx={{ width: '30%' }} component='img' src={menuImgUrl} />
        </Box>
        <FormControl variant='standard' sx={{mb:'0.5rem'}}>
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
          optionList.length < 1 ? (<Typography sx={{color:'orange'}}>해당 상품의 옵션을 추가하세요.</Typography>) :optionList.map((option,index)=>(
            <Box sx={{display:'flex', mb:'0.5rem'}}>
              <FormControl variant='standard' sx={{display:'inline-flex'}}>
                  <InputLabel>옵션 이름</InputLabel>
                  <Input readOnly value={option.optionName} type='text'/>
              </FormControl>
              <FormControl variant='standard' sx={{mx:'0.5rem', display:'inline-flex'}}>
                  <InputLabel>옵션 가격</InputLabel>
                  <Input readOnly value={option.optionPrice} type='number'/>
              </FormControl>
              <Button onClick={()=>onDeleteOptionButtonHandler(index)} >삭제</Button>
            </Box>
          ))
        }
        <Box sx={{display:'flex', mb:'0.5rem', border:'1px solid orange', borderRadius:3, p:'1rem'}}>
          <FormControl variant='standard' sx={{display:'inline-flex'}}>
              <InputLabel>옵션 이름</InputLabel>
              <Input value={optionName} onChange={(event)=>setOptionName(event.target.value)} type='text'/>
          </FormControl>
          <FormControl variant='standard' sx={{mx:'0.5rem', display:'inline-flex'}}>
              <InputLabel>옵션 가격</InputLabel>
              <Input value={optionPrice} onChange={(event)=>setOptionPrice(Number(event.target.value))} type='number' />
          </FormControl>
          <Button sx={{width:'150px'}} onClick={()=>onAddOptionButtonHandler()} >옵션 추가</Button>
        </Box>

        <Button sx={{my:'2rem'}} variant='outlined' onClick={()=>onAddMenuButtonHandler()}>메뉴 추가</Button>
      </Box>
    </Box>
  )
}
