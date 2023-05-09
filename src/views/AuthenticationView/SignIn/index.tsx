import { Box, Button, TextField, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  setLoginView: Dispatch<SetStateAction<boolean>>;
}

export default function SignIn( {setLoginView} : Props) {
  return (
    <>
      <Box>
          <Typography>회원 아이디</Typography>
          <TextField margin='dense' fullWidth variant='outlined' size='small'/>
          <Typography>비밀번호</Typography>
          <TextField margin='dense' fullWidth variant='outlined' size='small'/>
      </Box>
      <Button fullWidth >로그인</Button>
      <Box sx={{display:'flex' , alignItems:'center', my:'30px'}}>
          <Typography>회원이 아니신가요?</Typography>
          <Button onClick={()=>setLoginView(false)}>회원가입</Button>
      </Box>
    </>
  )
}
