import { Backdrop, Box, Button, FormControl, FormControlLabel, IconButton, Input, InputLabel, Select, SelectChangeEvent, Typography, MenuItem, Checkbox } from '@mui/material';
import React, { Dispatch, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios, { AxiosResponse } from 'axios';
import { useCategoryStore, useMenuStore, useStoreStore } from '../../../stores';
import { GetCategoryResponseDto } from '../../../apis/response/category';
import { GET_CATEGORY_LIST_URL, PATCH_MENU_URL, authorizationHeader } from '../../../constants/api';
import ResponseDto from '../../../apis/response';
import CustomMenuItem from '../../../components/CustomMenuItem/CustomMenuItem';
import { useCookies } from 'react-cookie';
import { PatchMenuRequestDto } from '../../../apis/request/menu';
import { PatchMenuResponseDto } from '../../../apis/response/menu';

interface Option {
    optionId: number | null;
    optionName: string;
    optionPrice: number;
}

interface Props {
    setEditView : Dispatch<React.SetStateAction<boolean>>;
}

export default function PatchMenuDetail({setEditView}: Props) {

    const {menu,setMenu} = useMenuStore();
    const {store} = useStoreStore();
    const {category,setCategory} = useCategoryStore();
    const [menuId] = useState<number>(menu!.menuId);
    const [menuName,setMenuName] = useState<string>(menu!.menuName);
    const [menuPrice, setMenuPrice] = useState<number>(menu!.menuPrice);
    const [menuState, setMenuState] = useState<boolean>(menu!.menuState);

    const [categoryList, setCategoryList] = useState<GetCategoryResponseDto[] | null>(null);
    const [categoryId, setCategoryId] = useState<number>(category!.categoryId);
    const [categoryName, setCategoryName] = useState<string>('');
    const [optionName, setOptionName] = useState<string>('');
    const [optionPrice, setOptionPrice] = useState<number | string>('');
    const [optionList, setOptionList] = useState<Option[]>([...menu!.optionList]);

    const [cookies] = useCookies();
    const accessToken = cookies.accessToken;

    const onUpdateMenuButtonHandler = () =>{

        console.log(menuId);

        const data : PatchMenuRequestDto ={
            categoryId,menuId,menuImgUrl:null,menuName,menuPrice,menuState,optionList,storeId:store!.storeId
        }

        axios
            .patch(PATCH_MENU_URL,data,authorizationHeader(accessToken))
            .then((response)=>patchMenuResponseHandler(response))
            .catch((error)=>patchMenuErrorHandler(error))
    }

    const getCategoryList = () =>{
        axios
            .get(GET_CATEGORY_LIST_URL(store?.storeId+''))
            .then((response)=>getCategoryListResponseHandler(response))
            .catch((error)=>getCategoryListErrorHandler(error))
    }

    const onCategorySelectChangeHandler = (event: SelectChangeEvent<number>) =>{
        const value = Number(event.target.value);
        setCategoryId(value);
        const onChangeCategoryName = categoryList ? categoryList.find((category)=>category.categoryId === value)!.categoryName : '';
        setCategoryName(onChangeCategoryName);

    }

    const onDeleteOptionButtonHandler = (index: number) => {
        optionList.splice(index,1);
        setOptionList([...optionList]);
    }

    const onAddOptionButtonHandler = () => {
        if(optionName === '') return alert('옵션이름을 입력해주세요.');
        optionList.push({optionId:null,optionName,optionPrice: optionPrice as number});
        setOptionList([...optionList]);
        setOptionName('');
        setOptionPrice('');
      }

    const getCategoryListResponseHandler = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<GetCategoryResponseDto[]>
        if(!result){
            alert(message);
            return;
        }
        setCategoryList(data);
    }

    const patchMenuResponseHandler = (response: AxiosResponse<any, any>) => {
        const {data,message,result} = response.data as ResponseDto<PatchMenuResponseDto>
        if(!result || !data){
            alert(message);
            return;
        }
        console.log(data);
        const {...menu} = data;
        setMenu(menu);
        setCategory({categoryId,categoryName});
        setEditView(false);
    }

    const patchMenuErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const getCategoryListErrorHandler = (error: any) => {
        console.log(error.message);
    }

    useEffect(()=>{
        getCategoryList();
    },[optionList])

  return (
    <>
        <Backdrop open={true} />
        <Box bgcolor='#ffffff' sx={{p:'1rem' ,position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', width:'350px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h5' marginBottom='10px' >메뉴 수정</Typography>
            <IconButton onClick={()=>setEditView(false)} sx={{position:'absolute',top:0, right:0}}>
                <CloseIcon fontSize='small'/>
            </IconButton>
            <FormControl variant='standard' sx={{display:'inline-flex'}}>
                <InputLabel>메뉴 이름</InputLabel>
                <Input value={menuName} onChange={(event)=>setMenuName(event.target.value)} type='text'/>
            </FormControl>
            <FormControl variant='standard' sx={{display:'inline-flex'}}>
                <InputLabel>가격</InputLabel>
                <Input value={menuPrice} onChange={(event)=>setMenuPrice(Number(event.target.value))} type='number'/>
            </FormControl>
            <FormControl variant='standard' sx={{mb:'0.5rem'}}>
                <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="Category"
                    onChange={(event)=>onCategorySelectChangeHandler(event)}
                >
                    {
                        categoryList && categoryList.map((category)=>(
                            <CustomMenuItem customValue={category.categoryName} value={category.categoryId}>{category.categoryName}</CustomMenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            {
                <>
                { optionList.length === 0 ? <></> : optionList.map((option, index)=>(
                    <>
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
                    </>
                ))}
                <Box sx={{display:'flex', mb:'0.5rem', border:'1px solid orange', borderRadius:3, p:'1rem'}}>
                    <FormControl variant='standard' sx={{display:'inline-flex'}}>
                        <InputLabel>옵션 이름</InputLabel>
                        <Input value={optionName} onChange={(event)=>setOptionName(event.target.value)} type='text'/>
                    </FormControl>
                    <FormControl variant='standard' sx={{mx:'0.5rem', display:'inline-flex'}}>
                        <InputLabel>옵션 가격</InputLabel>
                        <Input value={optionPrice} onChange={(event)=>setOptionPrice(Number(event.target.value))} type='number'/>
                    </FormControl>
                    <Button sx={{width:'150px'}} onClick={()=>onAddOptionButtonHandler()} >옵션 추가</Button>
                </Box>
                </>
            }
            <Button variant='outlined' onClick={()=> onUpdateMenuButtonHandler()}>메뉴 수정</Button>
        </Box>
    </>
  )
}
