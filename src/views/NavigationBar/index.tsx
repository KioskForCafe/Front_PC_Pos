import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import { AppBar, Box, Toolbar, Typography, FormControl, OutlinedInput, Button, Icon, IconButton } from '@mui/material'
import React from 'react'

export default function NavigationBar() {
  return (
    <Box sx={{ zIndex: 1, position:'relative', top:'0', height: '7vh'}}>
        <AppBar variant='outlined' position='relative' sx={{p: '0px 100px', backgroundColor: '#383947'}}>
            <Toolbar>
                <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: {xs: 'none', sm : 'block', color: '#ffffff'}}}>Kiosk Project</Typography>
                <Box sx={{display: 'flex'}}>
                    <Typography sx={{fontSize: '15px', mt: '10px'}}>2023.05.02(화) 03:00</Typography>
                    <IconButton sx={{fontSize: '10px', ml: '10px', color: '#13ba50'}}>
                            <CircleIcon/>
                        </IconButton>
                    <Typography sx={{fontSize: '15px', mt: '10px'}}>
                        영업중</Typography>
                    <IconButton sx={{ fontSize: 'large', ml: '10px', color: '#ffffff' }}>
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
