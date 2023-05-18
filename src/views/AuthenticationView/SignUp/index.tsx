import { Box, Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
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
    const [duplicateUserId, setDuplicateUserId] = useState<boolean | null>(null);
    const [duplicateEmail, setDuplicateUserEmail] = useState<boolean | null>(null);
    // todo : 전화번호 중복확인 추가하기 -> 추가전이라 true로 진행
    const [duplicateTelNumber, setDuplicateTelNumber] = useState<boolean | null>(true);
    
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
        const isValidate = passwordValidator.test(value);
        setPasswordPatternCheck(isValidate); 
        setPassword(value);
    }
    
    const onPasswordCheckChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setPasswordCheck(value);
        const isMatched = password === value;
        setPasswordMatchCheck(isMatched);
    }
    
    const onUserNameChangeHandler = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const value = event.target.value;
        const isValidate = userNameValidator.test(value);
        console.log(isValidate);
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

        if(userId === '' || password === '' || passwordCheck === '' || userName === '' || userEmail === '' || telNumber === '') return alert('입력되지 않은 정보가 존재합니다.');
        if(!userIdPatternCheck) return alert('아이디를 4~20자로 입력해주세요.');
        if(!passwordPatternCheck) return alert('비밀번호를 영문,숫자,특수문자(?!_)를 포함해서 8자 이상 입력해주세요.');
        if(!userNamePatternCheck) return alert('이름을 영문 또는 한글로 입력해주세요.');
        if(!userEmailPatternCheck) return alert('이메일을 형식에 맞게 입력해주세요.');
        if(!telNumberPatternCheck) return alert('전화번호를 010-1234-5678과 같은 패턴으로 입력해주세요.');
        if(duplicateUserId === null) return alert('아이디 중복확인이 필요합니다.');
        if(duplicateEmail === null) return alert('이메일 중복확인이 필요합니다.');
        if(duplicateTelNumber === null) return alert('전화번호 중복확인이 필요합니다.');
        if(!passwordMatchCheck) return alert('비밀번호가 일치하지 않습니다.')

        const data : SignUpRequestDto ={ userId, userName, password, telNumber, userEmail ,admin:true };

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
        console.log(data)
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
            <FormControl fullWidth variant='standard' sx={{mb:'0.5rem'}}>
                <InputLabel>아이디</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateUserIdButtonHandler()} sx={{minWidth:'80px', height:'25px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onUserIdChangeHandler(event)}
                />
                {
                    userId === '' ? (<></>) : 
                    !userIdPatternCheck ?  (<FormHelperText sx={{color:'red'}}>4~20자로 적어주세요.</FormHelperText>) :
                    duplicateUserId === null ? (<FormHelperText sx={{color:'orange'}}>아이디 중복 체크를 해주세요.</FormHelperText>) :
                    duplicateUserId ? (<FormHelperText sx={{color:'green'}}>사용 가능한 아이디입니다.</FormHelperText>) :
                    (<FormHelperText sx={{color:'red'}}>중복된 아이디입니다.</FormHelperText>)
                }
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'0.5rem'}}>
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
                onChange={(event) => onPasswordChangeHandler(event)}
                />
                {
                    password === '' ? (<></>) :
                    !passwordPatternCheck && (<FormHelperText sx={{color:'red'}}>영문,숫자,특수문자(!?_)를 포함한 8자이상을 입력해주세요.</FormHelperText>)
                }
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'0.5rem'}}>
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
                {
                    passwordCheck === '' ? (<></>) :
                    !passwordMatchCheck && (<FormHelperText sx={{color:'red'}}>비밀번호가 일치하지 않습니다.</FormHelperText>)
                }
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'0.5rem'}}>
                <InputLabel>이름</InputLabel>
                <Input type='text'
                 onChange={(event) => onUserNameChangeHandler(event)}/>
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'0.5rem'}}>
                <InputLabel>이메일</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateEmailButtonHandler()} sx={{minWidth:'80px', height:'25px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onUserEmailChangeHandler(event)}
                />
                {
                    userEmail === '' ? (<></>) :
                    !userEmailPatternCheck ? (<FormHelperText sx={{color:'red'}}>이메일 형식이 아닙니다.</FormHelperText>) :
                    duplicateEmail === null ? (<FormHelperText sx={{color:'orange'}}>이메일 중복 확인이 필요합니다.</FormHelperText>) :
                    duplicateEmail ? (<FormHelperText sx={{color:'green'}}>사용 가능한 이메일입니다.</FormHelperText>) :
                    (<FormHelperText sx={{color:'red'}}>중복된 이메일입니다.</FormHelperText>)
                }
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{mb:'0.5rem'}}>
                <InputLabel>전화번호</InputLabel>
                <Input type='text'endAdornment={
                    <InputAdornment position='end'>
                        <Button onClick={()=>onDuplicateTelNumberButtonHandler()} sx={{minWidth:'80px', height:'25px'}}>중복 확인</Button>
                    </InputAdornment>

                }
                onChange={(event) => onTelNumberChangeHandler(event)}
                />
                {
                    telNumber === '' ? (<></>) :
                    !telNumberPatternCheck ? (<FormHelperText sx={{color:'red'}}>{'전화번호 패턴이 일치하지 않습니다. ex) 010-0000-0001'}</FormHelperText>) :
                    duplicateTelNumber === null ? (<FormHelperText sx={{color:'orange'}}>전화번호 중복 확인이 필요합니다.</FormHelperText>) :
                    duplicateTelNumber ? (<FormHelperText sx={{color:'green'}}>사용 가능한 전화번호입니다.</FormHelperText>) :
                    (<FormHelperText sx={{color:'red'}}>중복된 전화번호입니다.</FormHelperText>)
                }
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
