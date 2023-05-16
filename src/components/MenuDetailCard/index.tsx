import { Box, Button, Checkbox, FormControlLabel, IconButton } from '@mui/material'
import axios from 'axios'
import React, { Dispatch, useState } from 'react'
import { POST_ORDER_DETAIL_URL } from '../../constants/api'
import { PostOrderDetailRequestDto } from '../../apis/request/order'
import { useMenuStore } from '../../stores'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

interface Props {
  setMenuDetailView: Dispatch<React.SetStateAction<boolean>>
}

export default function MenuDetailCard({setMenuDetailView}:Props) {

  const {menu} = useMenuStore();
  const [orderDetailCount, setOrderDetailCount] = useState<number>(1);

  const onPlusButtonHandler = () => {
    setOrderDetailCount(orderDetailCount+1);
  }

  const onMinusButtonHandler = () => {
    if(orderDetailCount <= 1) return;
    setOrderDetailCount(orderDetailCount-1);
  }

  const onAddMenuButtonHandler = () =>{
    
    setMenuDetailView(false);
  }

  return (
    <Box>
      <Box>
        <Box display='inline-block'>상세 주문</Box>
        <Box display='inline-block'> 닫기아이콘</Box>
      </Box>
      <Box>메뉴 이름</Box>
      <Box>{menu?.menuName}</Box>
      <Box>메뉴 가격</Box>
      <Box>{menu?.menuPrice}</Box>
      {
        menu?.optionList &&
        (
          <>
            <Box>메뉴 옵션</Box>
            {menu?.optionList.map((option)=>(
              <FormControlLabel label={`${option.optionName} : ${option.optionPrice}`} control={<Checkbox/>}/>
            ))}
          </>
        )
      }
      <IconButton onClick={()=>onMinusButtonHandler()}>
        <IndeterminateCheckBoxOutlinedIcon/>
      </IconButton>
      <Box>수량</Box>
      <IconButton onClick={()=>onPlusButtonHandler()}>
        <AddBoxOutlinedIcon/>
      </IconButton>
      <Box>{orderDetailCount}</Box>
      <Button onClick={()=> onAddMenuButtonHandler()}>주문추가</Button>
    </Box>
  )
}
