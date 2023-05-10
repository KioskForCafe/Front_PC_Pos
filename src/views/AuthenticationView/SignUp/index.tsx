import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useState } from 'react'
import axios, { AxiosResponse } from "axios";
import { DuplicateCheckIdResponseDto } from '../../../apis/response/user';
import { DuplicateIdRequestDto } from '../../../apis/request/user';
import { DUPLICATE_USER_ID_URL } from '../../../constants/api';
import ResponseDto from '../../../apis/response';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface Props {
    setLoginView: Dispatch<SetStateAction<boolean>>;
}

export default function SignUp({setLoginView}:Props) {

    const [userId, setUserId] = useState<string>("");
    const [duplicateUserId, setDuplicateUserId] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [duplicateEmail, setDuplicateEmail] = useState<boolean>(false);
    const [telNumber, setTelNumber] = useState<string>("");
    const [duplicateTelNumber, setDuplicateTelNumber] = useState<boolean>(false);
    
    const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        setUserId(value);
    }

    const onDuplicateUserIdButtonHandler = () =>{
        const data : DuplicateIdRequestDto ={ userId };

        axios.post(DUPLICATE_USER_ID_URL, data)
        .then((response)=> DuplicateUserIdResponseHanlder(response))
        .catch((error)=>DuplicateUserIdErrorHandler(error));
    };

    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setPassword(value);
    }
    
    const onPasswordCheckChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setPasswordCheck(value);
    }
    
    const onUserNameChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        setUserName(value);
        
    }
    const onDuplicateEmailButtonHandler = () =>{
        
    }
    const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        setEmail(value);
        
    }
    const onDuplicateTelNumberButtonHandler = () =>{
        
    }
    const onTelNumberChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        setTelNumber(value);

    }
    const onSignUpButtonHandler = () =>{

    }

    const DuplicateUserIdResponseHanlder = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<DuplicateCheckIdResponseDto>;
        if(!result || !data){
            alert(message);
            return;
        }
        setDuplicateUserId(data.result);
    }

    const DuplicateUserIdErrorHandler = (error: any) =>{
        console.log(error.message);
    }


  return (
    <>
        <Box>
            <Typography variant='h4' marginBottom='30px'>회원가입</Typography>
        </Box>
        <Box>
            <FormControl fullWidth variant='standard'>
                <InputLabel>아이디</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateUserIdButtonHandler()} sx={{minWidth:'80px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onUserIdChangeHandler(event)}
                />
            </FormControl>
            <FormControl fullWidth variant='standard'>
                <InputLabel>비밀번호</InputLabel>
                <Input 
                    type={showPassword ? 'text' :'password' }
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    onChange={(event) => onPasswordChangeHandler(event)}/>
            </FormControl>
            <FormControl fullWidth variant='standard'>
                <InputLabel>비밀번호 확인</InputLabel>
                <Input type={showPasswordCheck ? 'text' :'password' }
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                      >
                        {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                 onChange={(event) => onPasswordCheckChangeHandler(event)}/>
            </FormControl>
            <FormControl fullWidth variant='standard'>
                <InputLabel>이름</InputLabel>
                <Input type='text'
                 onChange={(event) => onUserNameChangeHandler(event)}/>
            </FormControl>
            <FormControl fullWidth variant='standard'>
                <InputLabel>이메일</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateEmailButtonHandler()} sx={{minWidth:'80px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onEmailChangeHandler(event)}
                />
            </FormControl>
            <FormControl fullWidth variant='standard'>
                <InputLabel>전화번호</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateTelNumberButtonHandler()} sx={{minWidth:'80px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onTelNumberChangeHandler(event)}
                />
            </FormControl>
        </Box>
        <Box >
            <Button onClick={()=>onSignUpButtonHandler()} fullWidth>회원가입</Button>
        </Box>
        <Box sx={{display:'flex' , alignItems:'center', my:'30px'}}>
            <Typography>이미 회원이신가요?</Typography>
            <Button onClick={()=>setLoginView(true)}>로그인</Button>
        </Box>

    </>
  )
}
