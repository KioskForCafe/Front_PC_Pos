import { Button } from '@mui/material'
import React from 'react'
import { GetCategoryResponseDto } from '../../apis/response/category'
import { useCategoryStore, useMenuStore, useStoreStore } from '../../stores'
import axios, { AxiosResponse } from 'axios'
import { GET_MENU_LIST_URL } from '../../constants/api'
import ResponseDto from '../../apis/response'
import { GetMenuResponseDto } from '../../apis/response/menu'

interface Props{
    category: GetCategoryResponseDto
}

export default function CategoryButton({category}:Props) {

  const {setCategory} = useCategoryStore();

  const onCategoryButtonHandler = () =>{
    setCategory(category);
  }

  return (
    <Button onClick={() => onCategoryButtonHandler()} sx={{flex:1}}>{category.categoryName}</Button>
  )
}
