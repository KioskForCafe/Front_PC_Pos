import { Backdrop, Box, Button, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { useMenuStore, useOrderDetailListStore } from '../../stores'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CloseIcon from '@mui/icons-material/Close';
import OrderDetailList from '../../interfaces/OrderDetailList.interface';

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
  const {orderDetailList,setOrderDetailList} = useOrderDetailListStore();
  const [optionList,setOptionList] = useState<Option[]>([]);
  const [orderDetailCount, setOrderDetailCount] = useState<number>(1);
  const [checked, setChecked] = useState<{[key:string]:boolean}>({});

  const onCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    })
  }

  const onPlusButtonHandler = () => {
    setOrderDetailCount(orderDetailCount +1);
  }

  const onMinusButtonHandler = () => {
    if(orderDetailCount <= 1) return;
    setOrderDetailCount(orderDetailCount-1);
  }

  const onAddMenuButtonHandler = () =>{

    menu!.optionList.map((option)=>{
      const optionId = (option.optionId)+'';
      if(checked[optionId] === true){
        const newOption : Option = {
          optionId: option.optionId,
          optionName: option.optionName,
          optionPrice: option.optionPrice
        }
        optionList.push(newOption);
        setOptionList([...optionList]);
      }
    })
    
    const newOrderDetail:OrderDetailList = {
      menuCount : orderDetailCount,
      menuId : menu!.menuId,
      menuName : menu!.menuName,
      menuPrice : menu!.menuPrice,
      optionList : optionList
    }
    orderDetailList.push(newOrderDetail);
    setOrderDetailList([...orderDetailList]);

    setMenuDetailView(false);

  }

  useEffect(()=>{
    
  },[])

  return (
    <>
      <Backdrop open={true} />
      <Box bgcolor='#ffffff' sx={{p:'1rem' ,position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', width:'300px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography variant='h5' marginBottom='10px' >메뉴 선택</Typography>
          <IconButton onClick={()=>setMenuDetailView(false)} sx={{position:'absolute',top:0, right:0}}>
            <CloseIcon/>
          </IconButton>
        <Typography>{menu?.menuName}</Typography>
        <Typography>{menu?.menuPrice}원</Typography>
        {
          menu?.optionList &&
          (
            <>
              <Typography>옵션 선택</Typography>
              {menu?.optionList.map((option)=>(
                <FormControlLabel sx={{display:'block'}} label={`${option.optionName} : ${option.optionPrice}`} control={<Checkbox name={option.optionId+''} onChange={(event)=>onCheckChangeHandler(event)} />}/>
              ))}
            </>
          )
        }
        <Typography>수량</Typography>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <IconButton onClick={()=>onMinusButtonHandler()}>
            <IndeterminateCheckBoxOutlinedIcon/>
          </IconButton>
          <Box>{orderDetailCount}</Box>
          <IconButton onClick={()=>onPlusButtonHandler()}>
            <AddBoxOutlinedIcon/>
          </IconButton>

        </Box>
        <Button variant='outlined' onClick={()=> onAddMenuButtonHandler()}>주문추가</Button>
      </Box>
    </>
  )
}
