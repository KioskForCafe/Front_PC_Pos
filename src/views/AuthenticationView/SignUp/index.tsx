import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import axios, { AxiosResponse } from "axios";
import { DuplicateCheckEmailResponseDto, DuplicateCheckIdResponseDto } from '../../../apis/response/user';
import { DuplicateEmailRequestDto, DuplicateIdRequestDto } from '../../../apis/request/user';
import { DUPLICATE_USER_EMAIL_URL, DUPLICATE_USER_ID_URL, SIGN_UP_URL } from '../../../constants/api';
import ResponseDto from '../../../apis/response';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { SignUpRequestDto } from '../../../apis/request/auth';
import { SignUpResponseDto } from '../../../apis/response/auth';
import { passwordValidator, telNumberValidator, userEmailValidator, userIdValidator, userNameValidator } from '../../../constants/validate';

interface Props {
    setLoginView: Dispatch<SetStateAction<boolean>>;
}

export default function SignUp({setLoginView}:Props) {

    const [isAdmin , setIsAdmin] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [telNumber, setTelNumber] = useState<string>("");
    
    const [userIdPatternCheck, setUserIdPatternCheck] = useState<boolean>(false);
    const [passwordPatternCheck, setPasswordPatternCheck] = useState<boolean>(false);
    const [passwordMatchCheck, setPasswordMatchCheck] = useState<boolean>(false);
    const [userNamePatternCheck, setUserNamePatternCheck] = useState<boolean>(false);
    const [userEmailPatternCheck, setUserEmailPatternCheck] = useState<boolean>(false);
    const [telNumberPatternCheck, setTelNumberPatternCheck] = useState<boolean>(false);
    const [duplicateEmail, setDuplicateUserEmail] = useState<boolean | null>(null);
    const [duplicateUserId, setDuplicateUserId] = useState<boolean | null>(null);
    // todo : 전화번호 중복확인 추가하기
    const [duplicateTelNumber, setDuplicateTelNumber] = useState<boolean | null>(null);
    
    const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = userIdValidator.test(value);
        setUserIdPatternCheck(isValidate);
        setDuplicateUserId(null);
        setUserId(value);
    }

    const onDuplicateUserIdButtonHandler = () =>{
        const data : DuplicateIdRequestDto ={ userId };

        axios.post(DUPLICATE_USER_ID_URL, data)
        .then((response)=> duplicateUserIdResponseHanlder(response))
        .catch((error)=>duplicateUserIdErrorHandler(error));
    };

    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        // const isValidate = passwordValidator.test(value);
        // setPasswordPatternCheck(isValidate); 
        setPassword(value);
    }
    
    const onPasswordCheckChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        const isMatched = password === value;
        setPasswordMatchCheck(isMatched);
        setPasswordCheck(value);
    }
    
    const onUserNameChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = userNameValidator.test(value);
        setUserNamePatternCheck(isValidate);
        setUserName(value);
        
    }

    const onDuplicateEmailButtonHandler = () =>{
        const data : DuplicateEmailRequestDto ={ userEmail };

        axios.post(DUPLICATE_USER_EMAIL_URL, data)
        .then((response)=> duplicateEmailResponseHanlder(response))
        .catch((error)=>duplicateEmailErrorHandler(error));
    }
    const onUserEmailChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = userEmailValidator.test(value);
        setUserEmailPatternCheck(isValidate);
        setDuplicateUserEmail(null);
        setUserEmail(value);
        
    }

    const onDuplicateTelNumberButtonHandler = () =>{
        // todo : 전화번호 중복확인도 필요해 보임
    }

    const onTelNumberChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = telNumberValidator.test(value);
        setTelNumberPatternCheck(isValidate);
        setTelNumber(value);

    }

    const onSignUpButtonHandler = () =>{
        const data : SignUpRequestDto ={ userId, userName, password, telNumber, userEmail ,isAdmin };

        axios.post(SIGN_UP_URL, data)
        .then((response)=> signUpResponseHanlder(response))
        .catch((error)=>signUpErrorHandler(error));
    }

    const duplicateUserIdResponseHanlder = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<DuplicateCheckIdResponseDto>;
        if(!result || !data){
            alert(message);
            return;
        }
        setDuplicateUserId(data.result);
    }

    const duplicateEmailResponseHanlder = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<DuplicateCheckEmailResponseDto>;
        if(!result || !data){
            alert(message);
            return;
        }
        setDuplicateUserEmail(data.result);
    }

    const signUpResponseHanlder = (response: AxiosResponse<any, any>) =>{
        const {data,message,result} = response.data as ResponseDto<SignUpResponseDto>
        if(!result || !data){
            alert(message);
            return;
        }
        setLoginView(true);
    }

    const duplicateUserIdErrorHandler = (error: any) =>{
        console.log(error.message);
    }
    
    const duplicateEmailErrorHandler = (error: any) =>{
        console.log(error.message);
    }
    
    const signUpErrorHandler = (error: any) =>{
        console.log(error.message);
    }


  return (
    <>
        <Box>
            <Typography variant='h4' marginBottom='30px'>회원가입</Typography>
        </Box>
        <Box>
            <FormControl fullWidth variant='standard' sx={{mb:'1rem'}}>
                <InputLabel>아이디</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateUserIdButtonHandler()} sx={{minWidth:'80px', height:'25px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onUserIdChangeHandler(event)}
                />
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'1rem'}}>
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
            <FormControl fullWidth variant='standard' sx={{mb:'1rem'}}>
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
            <FormControl fullWidth variant='standard' sx={{mb:'1rem'}}>
                <InputLabel>이름</InputLabel>
                <Input type='text'
                 onChange={(event) => onUserNameChangeHandler(event)}/>
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'1rem'}}>
                <InputLabel>이메일</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateEmailButtonHandler()} sx={{minWidth:'80px', height:'25px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onUserEmailChangeHandler(event)}
                />
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'1rem'}}>
                <InputLabel>전화번호</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateTelNumberButtonHandler()} sx={{minWidth:'80px', height:'25px'}}>중복 확인</Button>
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
