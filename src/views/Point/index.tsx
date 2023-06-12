import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, FormControl, IconButton, Input, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import useNavigation from '../../stores/navigation.store';
import { Navigation } from '../../constants/enum';
import axios, { AxiosResponse } from 'axios';
import { useStoreStore } from '../../stores';
import { GET_POINT, POST_POINT } from '../../constants/api';
import ResponseDto from '../../apis/response';
import { GetPointResponseDto, PostPointResponseDto } from '../../apis/response/point';
import { PostPointRequestDto } from '../../apis/request/point';

export default function Point() {

    const {setNavigation} = useNavigation();
    const { store } = useStoreStore();

    const [pointResponse, setPointResponse] = useState<GetPointResponseDto | null>(null);
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const [telNumber, setTelNumber] = useState<string>('');
    const [type, setType] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);

    //        Event Handler         //

    const onCloseButtonHandler = () => {
      setNavigation(Navigation.Order);
    }

    const getPoint = () => {
      if (telNumber == null) {
        alert('전화번호를 입력하세요.')
        return;
    }

      axios.get(GET_POINT(telNumber))
      .then((response) => getPointResponseHandler(response))
      .catch((error) => getPointErrorHandler(error));
    }

    const postPoint = () => {
      if (telNumber == null) {
        alert('전화번호를 입력하세요.')
        return;
    }

    const data : PostPointRequestDto = {
      currentPoint, telNumber, type: false, value
    }

    axios.post(POST_POINT, data)
    .then((response) => postPointResponseHandler(response))
    .catch((error) => postPointErrorHandler(error));


    }

    //          Response Handler          //

    const getPointResponseHandler = (response: AxiosResponse<any, any>) => {
      const {result, message, data} = response.data as ResponseDto<GetPointResponseDto>;
        if(!result || !data) {
            alert(message);
            return;
        }

        setPointResponse(data);
        console.log(pointResponse);
    }

    const postPointResponseHandler = (response: AxiosResponse<any, any>) => {
      const {data,message,result} = response.data as ResponseDto<PostPointResponseDto>
      if(!result || !data){
        alert(message);
        return;
      }

      alert('결제가 완료되었습니다.');
      setNavigation(Navigation.Order);
    }


    //        Error Handler         //

    const getPointErrorHandler = (error: any) => {
      console.log(error.message);
    }

    const postPointErrorHandler = (error: any) => {
      console.log(error.message);
    }


  return (
        <Box sx={{width:'35rem', height:'80vh'}}>
          <Box sx={{display:'flex', p:'1rem' ,justifyContent:'space-between', borderBottom:'1px solid #E6E8EB', alignItems:'center'}}>
              <Typography>포인트 적립/사용</Typography>
              <IconButton onClick={onCloseButtonHandler}>
                <CloseIcon />
              </IconButton>
          </Box>
          <Box sx={{display:'flex'}}>
                <Box sx={{flex:2}}>
                  <Box sx={{display:'flex'}}>
                    <Button sx={{flex:1, p: '10px'}} onClick={() => postPoint()}>적립</Button>
                    <Button sx={{flex:1}}>사용</Button>
                  </Box>
                  <FormControl>
                    <InputLabel sx={{m: '10px'}}>전화번호</InputLabel>
                    <Input onChange={(event)=>setTelNumber(event.target.value)} type='text'/>
                  </FormControl>
                  <FormControl>
                    <InputLabel sx={{m: '10px'}}>적립포인트</InputLabel>
                    <Input onChange={(event)=>setValue(Number(event.target.value))} type='number'/>
                  </FormControl>
                  <Button onClick={() => getPoint()}>조회</Button>
                  <Typography>보유: {currentPoint}P</Typography>
                </Box>
          </Box>
        </Box>
  )
}
