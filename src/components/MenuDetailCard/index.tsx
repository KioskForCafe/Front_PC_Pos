import { Box, Button, Checkbox, FormControlLabel, IconButton } from '@mui/material'
import axios from 'axios'
import React, { Dispatch, useEffect, useState } from 'react'
import { POST_ORDER_DETAIL_URL } from '../../constants/api'
import { PostOrderDetailRequestDto } from '../../apis/request/order'
import { useMenuDetailListStore, useMenuStore } from '../../stores'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuDetail from '../../interfaces/Menu-Detail.interface'

interface Option{
  optionId: number;
  optionName: string;
  optionPrice: number;
}
interface Props {
  setMenuDetailView: Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuDetailCard({setMenuDetailView}: Props) {

  const {menu} = useMenuStore();
  const [orderDetailCount, setOrderDetailCount] = useState<number>(1);
  const [selectedMenuDetail, setSelectedMenuDetail] = useState<MenuDetail | null>(null);

  const {menuDetailList,setMenuDetailList} = useMenuDetailListStore();

  const onCheckChangeHandler = (option : Option) =>{
    if(!selectedMenuDetail) return;
    if(selectedMenuDetail.optionList){
      const optionList = selectedMenuDetail.optionList;
      optionList.push(option);
      setSelectedMenuDetail({...selectedMenuDetail,optionList});
    }else{
      setSelectedMenuDetail({...selectedMenuDetail,optionList:[option]})
    }

  }

  const onPlusButtonHandler = () => {
    const newOrderDetailCount = orderDetailCount +1;
    setOrderDetailCount(newOrderDetailCount);
    if(!selectedMenuDetail) return;
    setSelectedMenuDetail({...selectedMenuDetail,menuCount:orderDetailCount})
  }

  const onMinusButtonHandler = () => {
    if(orderDetailCount <= 1) return;
    setOrderDetailCount(orderDetailCount-1);
    if(!selectedMenuDetail) return;
    setSelectedMenuDetail({...selectedMenuDetail,menuCount:orderDetailCount})
  }

  const onAddMenuButtonHandler = () =>{
    if (!menuDetailList) return;
    const newMenuDetailList: MenuDetail[] = menuDetailList.map(item => item) as MenuDetail[];
    if (!selectedMenuDetail) return;
    newMenuDetailList.push(selectedMenuDetail);
    setMenuDetailList(newMenuDetailList);
    setMenuDetailView(false);
    console.log(newMenuDetailList);
  }

  useEffect(()=>{
    setSelectedMenuDetail({
      menuId: menu!.menuId,
      menuName: menu!.menuName,
      menuCount: orderDetailCount,
      menuPrice: menu!.menuPrice,
      optionList: [],
    })

  },[])

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
              <FormControlLabel label={`${option.optionName} : ${option.optionPrice}`} control={<Checkbox onChange={()=>onCheckChangeHandler(option)} />}/>
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
