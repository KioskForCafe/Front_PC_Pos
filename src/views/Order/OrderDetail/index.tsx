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

export default function OrderDetail() {

  const {store} = useStoreStore();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {orderDetailList, resetOrderDetailList} = useOrderDetailListStore();

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
        <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center', height: '3rem'}}>
          <IconButton onClick={()=>resetOrderDetailList()}>
            <RestartAltIcon fontSize='large'/>
          </IconButton>
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', p:'20px', flex:1, overflow: 'auto'}}>
            <Box sx={{display:'flex', height:'2rem', alignItems:'center', m: '10px'}}>
                <Typography sx={{flex:2}}>상품명</Typography>
                <Typography sx={{flex:1}}>개당 가격</Typography>
                <Box sx={{flex:1}}>Count</Box>
                <Typography sx={{flex:1, textAlign:'end'}}>총 가격</Typography>
            </Box>
            <Divider sx={{mb: '10px'}}/>
            {
              orderDetailList.map((orderDetail)=>(
              <Box sx={{m: '10px', mb: '15px'}}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                    <Typography sx={{flex:2, fontSize: '1.3rem'}}>{orderDetail.menuName}</Typography>
                    <Typography sx={{flex:1, fontSize: '1.3rem'}}>{orderDetail.menuPrice}</Typography>
                    <Box sx={{flex:1, fontSize: '1.3rem'}}>{orderDetail.menuCount}</Box>
                    <Typography sx={{flex:1, fontSize: '1.3rem', textAlign:'end'}}>{orderDetail.menuPrice*orderDetail.menuCount}</Typography>
                </Box>
                {
                  orderDetail.optionList.map((option)=>(
                    <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                      <Typography sx={{flex:2}}>└ {option.optionName}</Typography>
                      <Typography sx={{flex:1}}>{option.optionPrice}</Typography>
                      <Box sx={{flex:1}}>{orderDetail.menuCount}</Box>
                      <Typography sx={{flex:1, textAlign:'end'}}>{option.optionPrice*orderDetail.menuCount}</Typography>
                    </Box>
                  ))
                }
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
