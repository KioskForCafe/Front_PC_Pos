import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import PostOrderDetailRequestDto from '../../../apis/request/order/Post-Order-Detail.request.dto';
import { useMenuDetailListStore } from '../../../stores';


export default function OrderDetail() {

  const {menuDetailList,resetMenuDetailList} = useMenuDetailListStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const onPaymentButtonHandler = () => {
    resetMenuDetailList();
    // setTotalPrice(0);
  }

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
              menuDetailList.map((menuDetail)=>(
              <>
                <Box sx={{display:'flex', height:'2rem', alignItems:'center'}}>
                    <Typography sx={{flex:2}}>{menuDetail.menuName}</Typography>
                    <Box sx={{flex:1}}>{menuDetail.menuCount}</Box>
                    <Typography sx={{flex:1, textAlign:'end'}}>{menuDetail.menuPrice}</Typography>
                </Box>
                {
                  menuDetail.optionList.map((option)=>(
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
