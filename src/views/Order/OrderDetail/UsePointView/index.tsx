import { Backdrop, Box, Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { telNumberValidator } from '../../../../constants/validate';

interface Props{
    setUsePointView: Dispatch<React.SetStateAction<boolean>>;
    totalPrice : number;
}

export default function UsePointView({setUsePointView, totalPrice}:Props) {

    const [backdropOpen, setBackdropOpen] = useState<boolean>(true);
    const [telNumber, setTelNumber] = useState<string>('');
    const [telNumberPatternCheck, setTelNumberPatternCheck] = useState<boolean>(false);
    const [getPointView, setGetPointView] = useState<boolean>(false);
    const [currentPoint] = useState<number>(1);
    const [usePoint, setUsePoint] = useState<number | null>(null);
    const [pointShortageCheck, setPointShortageCheck] = useState<boolean>(false);
    const [totalPriceAfterUsingPoint, setTotalPriceAfterUsingPoint] = useState<number>(totalPrice);


    const onTelNumberChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = telNumberValidator.test(value);
        setTelNumberPatternCheck(isValidate);
        setTelNumber(value);
    }

    const onGetPointButtonHandler = () => {
        // todo : 포인트 조회하는 API 와 연결
        setGetPointView(true);
    }

    const onUsePointChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number(event.target.value);
        const hasPoint = (currentPoint - value >= 0);
        setPointShortageCheck(!hasPoint);
        setUsePoint(value);
        setTotalPriceAfterUsingPoint(totalPrice - value);
    }

    const onPaymentButtonHandler = () => {
        if(pointShortageCheck){
            alert('포인트가 부족합니다.');
            return;
        }
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
                            <Button onClick={onPaymentButtonHandler}>결제하기</Button>
                        </>
                        )}
                        
                    </>
                )
            }
        </Box>
        
    </>
  )
}
