import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function SignIn() {
  return (
    <Box sx={{display:'flex',height:'88vh', justifyContent:'center', alignItems:'center'}}>
        <Box>
            <Box>
                <Typography variant='h3' color='#6c81ee'>통합 매장 관리</Typography>
                <Typography variant='h2'>Kiosk DashBoard</Typography>
            </Box>
            <Box sx={{mt:'40px'}}>
                <Typography>회원 아이디</Typography>
                <TextField margin='dense' fullWidth variant='outlined' size='small'/>
                <Typography>비밀번호</Typography>
                <TextField margin='dense' fullWidth variant='outlined' size='small'/>
            </Box>
            <Button fullWidth >로그인</Button>

            
        </Box>
    </Box>
  )
}
