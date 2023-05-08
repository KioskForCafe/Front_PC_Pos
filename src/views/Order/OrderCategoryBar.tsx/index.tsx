import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function OrderCategoryBar() {
  return (
    <Box sx={{display:'flex',width:'100%', height:'4rem'}}>
        <Button sx={{flex:1}}>브런치</Button>
        <Button sx={{flex:1}}>브런치</Button>
        <Button sx={{flex:1}}>브런치</Button>
        <Button sx={{flex:1}}>브런치</Button>
        <Box sx={{display:'flex', alignItems:'center', borderLeft:'1px solid #E6E8EB'}}>
            <IconButton sx={{flex:1}}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton sx={{flex:1}}>
                <KeyboardArrowRightIcon/>
            </IconButton>
            <IconButton sx={{flex:1}}>
                <SearchIcon/>
            </IconButton>
            <IconButton sx={{flex:1}}>
                <SettingsIcon/>
            </IconButton>
        </Box>
    </Box>
  )
}
