import { Box, Button, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { SignInRequestDto } from '../../../apis/request/auth';
import axios, { AxiosResponse } from 'axios';
import { SIGN_IN_URL } from '../../../constants/api';
import ResponseDto from '../../../apis/response';
import { SignInResponseDto } from '../../../apis/response/auth';
import { getExpires } from '../../../utils';
import { useCookies } from "react-cookie";
import { useNavigationStore, useUserStore } from '../../../stores';
import { Navigation } from '../../../constants/navigationEnum';

interface Props {
  setLoginView: Dispatch<SetStateAction<boolean>>;
}

export default function SignIn( {setLoginView} : Props) {

  const {setNavigation} = useNavigationStore();

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setUser} =useUserStore();

  const [cookies, setCookie] = useCookies();

  const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const value = event.target.value;
    setUserId(value);
  }
  
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const value = event.target.value;
    setPassword(value);
  }

  const onSignInButtonHandler = () =>{
    const data: SignInRequestDto = {userId, password};

    axios.post(SIGN_IN_URL, data)
      .then((response)=>signInResponseHandler(response))
      .catch((error)=>signInErrorHandler(error));
  }

  const signInResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data,message,result} = response.data as ResponseDto<SignInResponseDto>;
    if(!result || !data){
      alert(message);
      return;
    }
    const {token, expiredTime, ...user} = data;
    const expires = getExpires(expiredTime);
    setCookie('accessToken', token, {expires , path:'/'})
    setUser(user);
    setNavigation(Navigation.Store);

  }

  const signInErrorHandler = (error: any) =>{
    console.log(error.message);
  }


  return (
    <>
      <Box>
        <Typography variant='h4' marginBottom='30px'>로그인</Typography>
      </Box>
      <Box>
          <Typography>회원 아이디</Typography>
          <TextField  onChange={(event)=>onUserIdChangeHandler(event)} margin='dense' fullWidth variant='outlined' size='small'/>
          <Typography>비밀번호</Typography>
          <TextField type='password' onChange={(event)=>onPasswordChangeHandler(event)} margin='dense' fullWidth variant='outlined' size='small'/>
      </Box>
      <Button onClick={()=>onSignInButtonHandler()} fullWidth >로그인</Button>
      <Box sx={{display:'flex' , alignItems:'center', my:'30px'}}>
          <Typography>회원이 아니신가요?</Typography>
          <Button onClick={()=>setLoginView(false)}>회원가입</Button>
      </Box>
    </>
  )
}
