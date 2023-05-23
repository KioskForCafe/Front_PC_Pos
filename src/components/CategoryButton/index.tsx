import { Button } from '@mui/material'
import React from 'react'
import { GetCategoryResponseDto } from '../../apis/response/category'
import { useCategoryStore, useMenuStore, useStoreStore } from '../../stores'
import axios, { AxiosResponse } from 'axios'
import { GET_MENU_LIST_URL } from '../../constants/api'
import ResponseDto from '../../apis/response'
import { GetMenuResponseDto } from '../../apis/response/menu'

interface Props{
    item: GetCategoryResponseDto
}

export default function CategoryButton({item}:Props) {

  const {category,setCategory} = useCategoryStore();

  const onCategoryButtonHandler = () =>{
    setCategory(item);
  }

  return (
    <Button onClick={() => onCategoryButtonHandler()} sx={{flex:1, bgcolor: category!.categoryId === item.categoryId ? '#1976d250' : ''}}>{item.categoryName}</Button>
  )
}
