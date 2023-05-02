import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AppBar, Box, Toolbar, Typography, FormControl, OutlinedInput, Button, Icon, IconButton } from '@mui/material'
import React from 'react'

export default function index() {
  return (
    <Box sx={{flexGrow : 1}}>
        <AppBar variant='outlined' position='static' sx={{p: '0px 100px', backgroundColor: '#383947'}}>
            <Toolbar>
                <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: {xs: 'none', sm : 'block', color: '#ffffff'}}}>Koisk Project</Typography>
                <Box sx={{display: 'flex'}}>
                    <Typography sx={{fontSize: '18px', mt: '10px'}}>2023.05.02(화) 03:00</Typography>
                    <Typography sx={{fontSize: '15px', fontWeight: 550,  ml: '10px', mt: '11px'}}>영업중</Typography>
                    <IconButton sx={{ ml: '10px', color: '#ffffff' }}>
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
