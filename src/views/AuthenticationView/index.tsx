import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp';

export default function AuthenticationView() {

    const [loginView, setLoginView] = useState<boolean>(true);

  return (
    <Box sx={{display:'flex', height:'88vh', justifyContent:'center', alignItems:'center', overflow:'auto' }}>
        <Box>
            <Box sx={{mb:'40px'}}>
                <Typography variant='h3' color='#6c81ee'>통합 매장 관리</Typography>
                <Typography variant='h2'>Kiosk DashBoard</Typography>
            </Box>
            <Box sx={{width:'30vw', minWidth:'460px'}}>
              {loginView ? <SignIn setLoginView={setLoginView}/> : <SignUp setLoginView={setLoginView}/>}
            </Box>
            
        </Box>
    </Box>
  )
}
