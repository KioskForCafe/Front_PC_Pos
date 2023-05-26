import { Backdrop, Box, Button, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { useCategoryStore, useMenuStore, useOrderDetailListStore } from '../../../stores'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CloseIcon from '@mui/icons-material/Close';
import OrderDetailList from '../../../interfaces/OrderDetailList.interface';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import axios, { AxiosResponse } from 'axios';
import { DELETE_MENU_URL, authorizationHeader } from '../../../constants/api';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../../apis/response';
import { DeleteMenuResponseDto } from '../../../apis/response/menu';

interface Option{
  optionId: number;
  optionName: string;
  optionPrice: number;
}

interface Props {
  setMenuDetailView: Dispatch<React.SetStateAction<boolean>>;
  setEditView : Dispatch<React.SetStateAction<boolean>>
}

export default function MenuDetailCard({setEditView ,setMenuDetailView}: Props) {

  const {menu} = useMenuStore();
  const {category, setCategory} = useCategoryStore();
  const {orderDetailList,setOrderDetailList} = useOrderDetailListStore();
  const [optionList,setOptionList] = useState<Option[]>([]);
  const [orderDetailCount, setOrderDetailCount] = useState<number>(1);
  const [checked, setChecked] = useState<{[key:string]:boolean}>({});
  const [backdropOpen, setBackdropOpen] = useState<boolean>(true);
  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;

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

  const onDeleteMenuButtonHandler = () => {
    setBackdropOpen(false);
    confirmAlert({
      customUI:({onClose}) =>{
        const onYesButtonHandler = () => {
          setBackdropOpen(true);
          onClose();

          axios
            .delete(DELETE_MENU_URL(menu!.menuId),authorizationHeader(accessToken))
            .then((response)=>onDeleteMenuResponseHandler(response))
            .catch((error)=>onDeleteMenuErrorHandler(error))

        }
        const onNoButtonHandler = () =>{
          setBackdropOpen(true);
          onClose()
        }

        return (
          <>
            <Backdrop open={true} />
            <Box bgcolor='#ffffff' sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', p:'2rem'}}>
              <Typography>Menu를 삭제하시겠습니까?</Typography>
              <Button onClick={()=>onYesButtonHandler()}>Yes</Button>
              <Button onClick={()=>onNoButtonHandler()}>No</Button>
            </Box>
          </>
        )
      }
    })

    

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
    
    let optionTotalPrice = 0;
    optionList.forEach((option)=> {
      optionTotalPrice += option.optionPrice;
    })
    const newOrderDetail:OrderDetailList = {
      menuCount : orderDetailCount,
      menuId : menu!.menuId,
      menuName : menu!.menuName,
      menuPrice : menu!.menuPrice,
      optionList : optionList,
      PriceWithOption : menu!.menuPrice + optionTotalPrice
    }
    orderDetailList.push(newOrderDetail);
    setOrderDetailList([...orderDetailList]);

    setMenuDetailView(false);

  }

  const onDeleteMenuResponseHandler = (response: AxiosResponse<any, any>) => {
    const {data,message,result} = response.data as ResponseDto<DeleteMenuResponseDto>
    if(!result || !data){
      alert(message);
      return;
    }
    if(category !==null) setCategory({...category});
    
    setMenuDetailView(false);

  }

  const onDeleteMenuErrorHandler = (error: any) => {
    console.log(error.message);
  }

  useEffect(()=>{
    
  },[])

  return (
    <>
      <Backdrop open={backdropOpen} />
      <Box bgcolor='#ffffff' sx={{p:'1rem' ,position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', width:'350px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography variant='h5' marginBottom='10px' >메뉴 선택</Typography>
          <Box display='flex' justifyContent='center'>
            <Box sx={{ width: '50%' }} component='img' src={menu!.menuImgUrl} />
          </Box>
          <IconButton onClick={()=>setEditView(true)} sx={{position:'absolute',top:0, right:60}}>
            <EditIcon fontSize='small'/>
          </IconButton>
          <IconButton onClick={()=>onDeleteMenuButtonHandler()} sx={{position:'absolute',top:0, right:30}}>
            <DeleteIcon fontSize='small'/>
          </IconButton>
          <IconButton onClick={()=>setMenuDetailView(false)} sx={{position:'absolute',top:0, right:0}}>
            <CloseIcon fontSize='small'/>
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
