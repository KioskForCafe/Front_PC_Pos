import { Backdrop, Box, Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { telNumberValidator } from '../../../../constants/validate';
import axios, { AxiosResponse } from 'axios';
import { GET_POINT, POST_ORDER_URL, POST_POINT } from '../../../../constants/api';
import { GetPointResponseDto, PostPointResponseDto } from '../../../../apis/response/point';
import ResponseDto from '../../../../apis/response';
import { PostPointRequestDto } from '../../../../apis/request/point';
import { useOrderDetailListStore, useStoreStore } from '../../../../stores';
import { PostOrderDetailRequestDto, PostOrderRequestDto } from '../../../../apis/request/order';
import { OrderState } from '../../../../constants/enum';
import { bootPayHook } from '../../../../hooks';
import { PostOrderResponseDto } from '../../../../apis/response/order';

interface Props{
    setUsePointView: Dispatch<React.SetStateAction<boolean>>;
    setSavePointView: Dispatch<React.SetStateAction<boolean>>
    totalPrice : number;
}

export default function UsePointView({setUsePointView, setSavePointView, totalPrice}:Props) {

    const [backdropOpen, setBackdropOpen] = useState<boolean>(true);
    const [telNumber, setTelNumber] = useState<string>('');
    const [telNumberPatternCheck, setTelNumberPatternCheck] = useState<boolean>(false);
    const [getPointView, setGetPointView] = useState<boolean>(false);
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const [usePoint, setUsePoint] = useState<number | null>(null);
    const [pointShortageCheck, setPointShortageCheck] = useState<boolean>(false);
    const [totalPriceAfterUsingPoint, setTotalPriceAfterUsingPoint] = useState<number>(totalPrice);

    const {orderDetailList, setOrderDetailList , resetOrderDetailList} = useOrderDetailListStore();
    const {store} = useStoreStore();


    const onTelNumberChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = telNumberValidator.test(value);
        setTelNumberPatternCheck(isValidate);
        setTelNumber(value);
    }

    const onGetPointButtonHandler = () => {
        axios
            .get(GET_POINT(telNumber))
            .then(response => onGetPointResponseHandler(response))
            .catch(error => onGetPointErrorHandler(error))
    }

    const onUsePointChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number(event.target.value);
        const hasPoint = (currentPoint - value >= 0);
        setPointShortageCheck(!hasPoint);
        setUsePoint(value);
        setTotalPriceAfterUsingPoint(totalPrice - value);
    }

    const onUsePointPaymentButtonHandler = async () => {
        if(pointShortageCheck){
            alert('포인트가 부족합니다.');
            return;
        }
      
          const patchList : PostOrderDetailRequestDto[] = [];
          orderDetailList.forEach((orderDetail)=>{
      
            let optionPrice = 0;
      
            const patchOptionList : number[] = [];
            orderDetail.optionList.forEach((option)=>{
              patchOptionList.push(option.optionId);
              optionPrice += option.optionPrice;
            })
      
            const patch : PostOrderDetailRequestDto = {
              menuId: orderDetail.menuId,
              menuCount: orderDetail.menuCount,
              priceWithOption: orderDetail.menuPrice + optionPrice,
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
      
          const response = await bootPayHook();
      
          switch (response.event) {
            case 'issued' :
              break
            case 'done' :
              axios
                .post(POST_ORDER_URL,data)
                .then((response)=>postOrderResponseHandler(response))
                .catch((error)=>postOrderErrorHandler(error))
              break
            case 'error' :
              break
          }
        
    }

    const onGetPointResponseHandler = (response: AxiosResponse<any, any>) => {
        const {data,message,result} = response.data as ResponseDto<GetPointResponseDto>;
        if(!data || !result){
            alert(message);
            return;
        }
        setCurrentPoint(data.currentPoint);
        setGetPointView(true);
    }

    const postOrderResponseHandler = (response: AxiosResponse<any, any>) => {
        const {data,message,result} = response.data as ResponseDto<PostOrderResponseDto>;
        if(!data || !result){
          alert(message);
          return;
        }

        const usePointData : PostPointRequestDto = {
            telNumber,
            type : false,
            value : usePoint as number
        }

        axios
            .post(POST_POINT,usePointData)
            .then(response => onUsePointPaymentResponseHandler(response))
            .catch(error => onUsePointPaymentErrorHandler(error))
      }

    const onUsePointPaymentResponseHandler = (response: AxiosResponse<any, any>) => {
        const {data,message,result} = response.data as ResponseDto<PostPointResponseDto>;
        if(!data || !result){
            alert(message);
            return;
        }
        setSavePointView(true);
        setUsePointView(false);
    }

    const onGetPointErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const postOrderErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const onUsePointPaymentErrorHandler = (error: any) => {
        console.log(error.message);
    }

  return (
    <>
        <Backdrop open={backdropOpen} />
        <Box bgcolor='#ffffff' sx={{p:'1rem' ,position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', width:'350px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h5' marginBottom='10px' >포인트 사용</Typography>
            <IconButton onClick={()=>setUsePointView(false)} sx={{position:'absolute',top:0, right:0}}>
                <CloseIcon/>
            </IconButton>
            <FormControl variant='standard' sx={{display:'inline-flex'}}>
                <InputLabel>전화 번호</InputLabel>
                <Input value={telNumber} onChange={(event)=>onTelNumberChangeHandler(event)} type='text'/>
                {
                    telNumber === '' ? (<></>) :
                    !telNumberPatternCheck ? (<FormHelperText sx={{color:'red'}}>{'전화번호 패턴이 일치하지 않습니다. ex) 010-0000-0001'}</FormHelperText>) :
                    (<FormHelperText sx={{color:'green'}}>사용 가능한 전화번호입니다.</FormHelperText>)
                }
            </FormControl>
            <Button onClick={()=>onGetPointButtonHandler()}>보유 포인트 조회</Button>
            {
                getPointView && (
                    <>
                        <Typography>보유 포인트</Typography>
                        {currentPoint === 0 ? <Typography>보유한 포인트가 없습니다.</Typography> : (
                        <>
                            <Typography>{currentPoint}</Typography>
                            <FormControl variant='standard' sx={{display:'inline-flex'}}>
                                <InputLabel>사용 할 포인트</InputLabel>
                                <Input value={usePoint} onChange={(event)=>onUsePointChangeHandler(event)} type='number'/>
                                {
                                    usePoint === 0 ? (<></>) :
                                    pointShortageCheck && (<FormHelperText sx={{color:'red'}}>포인트가 부족합니다.</FormHelperText>)
                                    
                                }
                            </FormControl>
                            <Typography>총 가격</Typography>
                            <Typography>{totalPrice}</Typography>
                            <Typography>사용 포인트</Typography>
                            <Typography>{usePoint}</Typography>
                            <Typography>총 결제 가격</Typography>
                            <Typography>{totalPriceAfterUsingPoint}</Typography>
                            <Button onClick={onUsePointPaymentButtonHandler}>결제하기</Button>
                        </>
                        )}
                        
                    </>
                )
            }
        </Box>
        
    </>
  )
}
