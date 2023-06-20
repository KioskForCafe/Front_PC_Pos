import { Backdrop, Box, Button, FormControl, FormHelperText, IconButton, Input, InputLabel, Typography } from '@mui/material';
import React, { ChangeEvent, Dispatch, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { telNumberValidator } from '../../../../constants/validate';
import axios, { AxiosResponse } from 'axios';
import { GET_POINT, POST_POINT } from '../../../../constants/api';
import ResponseDto from '../../../../apis/response';
import { GetPointResponseDto, PostPointResponseDto } from '../../../../apis/response/point';
import { PostPointRequestDto } from '../../../../apis/request/point';
import { useOrderDetailListStore } from '../../../../stores';

interface Props{
    setSavePointView: Dispatch<React.SetStateAction<boolean>>;
    totalPrice : number;
}

export default function SavePointView({setSavePointView, totalPrice}: Props) {

    const {resetOrderDetailList} = useOrderDetailListStore();
    const [backdropOpen, setBackdropOpen] = useState<boolean>(true);
    const [telNumber, setTelNumber] = useState<string>('');
    const [telNumberPatternCheck, setTelNumberPatternCheck] = useState<boolean>(false);
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const [getPointView, setGetPointView] = useState<boolean>(false);
    const [savePointValue] = useState<number>(totalPrice*0.1);

    const onTelNumberChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = telNumberValidator.test(value);
        setTelNumberPatternCheck(isValidate);
        setTelNumber(value);
    }

    const onCloseIconButtonHandler = () => {
        resetOrderDetailList();
        setSavePointView(false);
    }

    const onGetPointButtonHandler = () => {
        axios
            .get(GET_POINT(telNumber))
            .then(response => onGetPointResponseHandler(response))
            .catch(error => onGetPointErrorHandler(error))
    }

    const onSavePointButtonHandler = () => {

        const data : PostPointRequestDto  = {
            telNumber,
            type : true,
            value : savePointValue
        }

        axios
            .post(POST_POINT,data)
            .then(response => onSavePointResponseHandler(response))
            .catch(error => onSavePointErrorHandler(error))
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

    const onSavePointResponseHandler = (response: AxiosResponse<any, any>) => {
        const {data,message,result} = response.data as ResponseDto<PostPointResponseDto>;
        if(!result || !data){
            alert(message);
            return;
        }
        setSavePointView(false);
        resetOrderDetailList();
    }

    const onGetPointErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const onSavePointErrorHandler =(error: any) => {
        console.log(error.message);
    }
    
  return (
    <>
        <Backdrop open={backdropOpen} />
        <Box bgcolor='#ffffff' sx={{p:'1rem' ,position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', width:'350px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h5' marginBottom='10px' >포인트 적립</Typography>
            <IconButton onClick={()=>onCloseIconButtonHandler()} sx={{position:'absolute',top:0, right:0}}>
                <CloseIcon/>
            </IconButton>
            <FormControl variant='standard' sx={{display:'inline-flex'}}>
                <InputLabel>전화 번호</InputLabel>
                <Input value={telNumber} onChange={(event)=>onTelNumberChangeHandler(event)} type='text'/>
                {
                    telNumber === '' ? (<></>) :
                    !telNumberPatternCheck && (<FormHelperText sx={{color:'red'}}>{'전화번호 패턴이 일치하지 않습니다. ex) 010-0000-0001'}</FormHelperText>)
                }
            </FormControl>
            <Button onClick={()=>onGetPointButtonHandler()}>보유 포인트 조회</Button>
            {
                getPointView && (
                    <>
                        <Typography>보유 포인트</Typography>
                        <Typography>{currentPoint}</Typography>
                        <Typography>적립 포인트</Typography>
                        <Typography>{savePointValue}</Typography>
                        <Typography>총 보유 포인트</Typography>
                        <Typography>{currentPoint+savePointValue}</Typography>
                        <Button onClick={onSavePointButtonHandler}>적립하기</Button>
                    </>
                )
            }
        </Box>
        
    </>
  )
}
