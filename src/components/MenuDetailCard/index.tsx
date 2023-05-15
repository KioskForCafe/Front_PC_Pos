import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import axios from 'axios'
import React, { Dispatch } from 'react'
import { POST_ORDER_DETAIL_URL } from '../../constants/api'
import { PostOrderDetailRequestDto } from '../../apis/request/order'
import { useMenuStore } from '../../stores'

interface Props {
  setMenuDetailView: Dispatch<React.SetStateAction<boolean>>
}

export default function MenuDetailCard({setMenuDetailView}:Props) {

  const {menu} = useMenuStore();
  // const [] =

  const onAddMenuButtonHandler = () =>{

    // const data: PostOrderDetailRequestDto = {
    //   menuId: 0,
    //   menuCount: menu.,
    //   orderId: menu.or,
    //   optionList: menu?.optionList
    // }

    // axios
    //   .post(POST_ORDER_DETAIL_URL,data)
    //   .then()
    //   .catch()

    setMenuDetailView(false);
  }

  return (
    <Box>
      <Box>
        <Box display='inline-block'>상세 주문</Box>
        <Box display='inline-block'> 닫기아이콘</Box>
      </Box>
      <Box>메뉴 이름</Box>
      <Box>메뉴 가격</Box>
      <Box>메뉴 옵션</Box>
      <Box>
        <FormControlLabel label='옵션이름' control={<Checkbox/>}/>
        <Box>옵션 가격</Box>
      </Box>
      <Box>수량</Box>
      <Button onClick={()=> onAddMenuButtonHandler()}>주문추가</Button>
    </Box>
  )
}
