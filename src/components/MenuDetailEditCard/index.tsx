import { Backdrop, Box, Button, FormControl, FormControlLabel, IconButton, Input, InputLabel, Select, SelectChangeEvent, Typography, MenuItem, Checkbox } from '@mui/material';
import React, { Dispatch, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useMenuStore, useStoreStore } from '../../stores';
import { GetCategoryResponseDto } from '../../apis/response/category';
import ResponseDto from '../../apis/response';
import axios, { AxiosResponse } from 'axios';
import { GET_CATEGORY_LIST_URL } from '../../constants/api';

interface Option {
    optionId: number | null;
    optionName: string;
    optionPrice: number;
}

interface Props {
    setEditView : Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuDetailEditCard({setEditView}: Props) {

    const {menu} = useMenuStore();
    const {store} = useStoreStore();
    const [category, setCategory] = useState<string>('');
    const [categoryList, setCategoryList] = useState<GetCategoryResponseDto[] | null>(null);
    const [categoryId, setCategoryId] = useState<number|null>(null);
    const [optionName, setOptionName] = useState<string>('');
    const [optionPrice, setOptionPrice] = useState<number | string>('');
    const [optionList, setOptionList] = useState<Option[]>([...menu!.optionList]);

    const onUpdateMenuButtonHandler = () =>{
        // axios
        //     .patch()
        //     .then()
        //     .catch()
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
                <Input value={menu?.menuName} type='text'/>
            </FormControl>
            <FormControl variant='standard' sx={{display:'inline-flex'}}>
                <InputLabel>가격</InputLabel>
                <Input value={menu?.menuPrice} type='text'/>
            </FormControl>
            <FormControl variant='standard' sx={{mb:'0.5rem'}}>
                <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    // value={categoryList?.find((category)=> category.categoryId === menu?.categoryId)!.categoryName}
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
