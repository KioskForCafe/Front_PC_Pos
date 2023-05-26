import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { PostOrderDetailRequestDto, PostOrderRequestDto } from '../../../apis/request/order';
import { useOrderDetailListStore, useStoreStore } from '../../../stores';
import { POST_ORDER_URL } from '../../../constants/api';
import ResponseDto from '../../../apis/response';
import { PostOrderResponseDto } from '../../../apis/response/order';
import { getTotalPrice } from '../../../utils';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { OrderState } from '../../../constants/enum';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function OrderDetail() {

  const {store} = useStoreStore();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {orderDetailList, setOrderDetailList , resetOrderDetailList} = useOrderDetailListStore();

  const onMinusButtonHandler = (menuCount:number, index:number) =>{
    if(menuCount <= 1) return;
    const newOrderDetail = [...orderDetailList].map((orderDetail,idx)=>{
      if(index === idx){
        orderDetail.menuCount--;
      }
      return orderDetail;
    });
    setOrderDetailList(newOrderDetail);
  }

  const onPlusButtonHandler = (menuCount:number, index:number) =>{
    const newOrderDetail = [...orderDetailList].map((orderDetail,idx)=>{
      if(index === idx){
        orderDetail.menuCount++;
      }
      return orderDetail;
    });
    setOrderDetailList(newOrderDetail);
  }

  const onPaymentButtonHandler = () => {

    if(orderDetailList.length === 0) {
      alert('상품을 담아주세요');
      return;
    }
    const patchList : PostOrderDetailRequestDto[] = [];
    orderDetailList.map((orderDetail)=>{

      const patchOptionList : number[] = [];
      orderDetail.optionList.map((option)=>{
        patchOptionList.push(option.optionId);
      })

      const patch : PostOrderDetailRequestDto = {
        menuId: orderDetail.menuId,
        menuCount: orderDetail.menuCount,
        optionList: patchOptionList
      }
      
      patchList.push(patch);

    })
    
    const data : PostOrderRequestDto ={
      storeId:store!.storeId,
      totalPrice,
      orderDetailList: patchList,
      orderState: OrderState.WAITING
    }
    
    axios
      .post(POST_ORDER_URL,data)
      .then((response)=>postOrderResponseHandler(response))
      .catch((error)=>postOrderErrorHandler(error))
  }

  const postOrderResponseHandler = (response: AxiosResponse<any, any>) => {
    const {data,message,result} = response.data as ResponseDto<PostOrderResponseDto>;
    if(!data || !result){
      alert(message);
      return;
    }
    resetOrderDetailList();
  }

  const postOrderErrorHandler = (error: any) => {
    console.log(error.message);
  }

  useEffect(()=>{
    const sumPrice = getTotalPrice(orderDetailList);
    setTotalPrice(sumPrice);
  },[orderDetailList])

  return (
    <Box sx={{ display:'flex', flexDirection:'column', flex:2}}>
        <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center', height: '3rem'}}>
          <IconButton onClick={()=>resetOrderDetailList()}>
            <RestartAltIcon fontSize='large'/>
          </IconButton>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', px:'20px', flex:1, overflow: 'auto'}}>
            <Box sx={{display:'flex', height:'2rem', alignItems:'center', m: '10px'}}>
                <Typography sx={{flex:3}}>상품명(가격)</Typography>
                <Box sx={{flex:1, textAlign:'center'}}>Count</Box>
                <Typography sx={{flex:1, textAlign:'end'}}>총 가격</Typography>
            </Box>
            <Divider sx={{mb: '10px'}}/>
            {
              orderDetailList.map((orderDetail,index)=>(
              <Box sx={{display:'flex', alignItems:'start'}}>
                <Box sx={{flex:3, m: '10px', mb: '15px'}}>
                  <Box sx={{display:'flex', alignItems:'center'}}>
                      <Typography sx={{flex:2, fontSize: '1.3rem'}}>{`${orderDetail.menuName} (${orderDetail.menuPrice})`}</Typography>
                  </Box>
                  {
                    orderDetail.optionList.map((option)=>(
                      <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                        <Typography sx={{flex:2}}>└ {`${option.optionName} (${option.optionPrice})`}</Typography>
                      </Box>
                    ))
                  }
                </Box>
                <Box sx={{flex:1, py:'0.5rem', fontSize: '1.3rem', display:'flex' , justifyContent:'center', alignItems:'center'}}>
                  <IconButton onClick={()=>onMinusButtonHandler(orderDetail.menuCount, index)}  size='small'>
                    <RemoveIcon/>
                  </IconButton>
                  {orderDetail.menuCount}
                  <IconButton onClick={()=>onPlusButtonHandler(orderDetail.menuCount, index)} size='small'>
                    <AddIcon/>
                  </IconButton>
                  </Box>
                <Box sx={{flex:1, py:'0.5rem', textAlign:'end' ,fontSize: '1.3rem'}}>{orderDetail.PriceWithOption * orderDetail.menuCount}</Box>
              </Box>
              ))
            }

        </Box>
        <Box sx={{display:'flex', height: '4rem'}}>
            <Button onClick={()=>onPaymentButtonHandler()} sx={{flex:2}}>{`${totalPrice}원 결제`}</Button>
            <Button sx={{flex:1}}>금액입력</Button>
        </Box>

    </Box>
  )
}
