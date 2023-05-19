import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { PostOrderDetailRequestDto, PostOrderRequestDto } from '../../../apis/request/order';
import { useOrderDetailListStore, useStoreStore } from '../../../stores';
import { POST_ORDER_URL } from '../../../constants/api';
import ResponseDto from '../../../apis/response';
import { PostOrderResponseDto } from '../../../apis/response/order';
import { getTotalPrice } from '../../../utils';

export default function OrderDetail() {

  const {store} = useStoreStore();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {orderDetailList, resetOrderDetailList} = useOrderDetailListStore();

  const onPaymentButtonHandler = () => {

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
      orderDetailList: patchList
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
    console.log('주문완료')

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
        <Box sx={{height: '4rem'}}>옵션기능</Box>
        <Box sx={{display:'flex', flexDirection:'column', p:'20px', flex:1}}>
            <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                <Typography sx={{flex:2}}>상품명</Typography>
                <Box sx={{flex:1}}>Count</Box>
                <Typography sx={{flex:1, textAlign:'end'}}>가격</Typography>
            </Box>
            {
              orderDetailList.map((orderDetail)=>(
              <>
                <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                    <Typography sx={{flex:2}}>{orderDetail.menuName}</Typography>
                    <Box sx={{flex:1}}>{orderDetail.menuCount}</Box>
                    <Typography sx={{flex:1, textAlign:'end'}}>{orderDetail.menuPrice}</Typography>
                </Box>
                {
                  orderDetail.optionList.map((option)=>(
                    <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                      <Typography sx={{flex:2}}>ㄴ {option.optionName}</Typography>
                      <Box sx={{flex:1}}></Box>
                      <Typography sx={{flex:1, textAlign:'end'}}>{option.optionPrice}</Typography>
                    </Box>
                  ))
                }
              </>
              ))
            }

        </Box>
        <Box sx={{display:'flex', height: '4rem'}}>
            <Button onClick={()=>onPaymentButtonHandler()} sx={{flex:4}}>{`${totalPrice}원 결제`}</Button>
            <Button sx={{flex:1}}>금액입력</Button>
        </Box>

    </Box>
  )
}
