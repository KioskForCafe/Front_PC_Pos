import { Box } from '@mui/material';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

function Footer() {
    const notification = false;
    return (
            <Box sx={{display: 'flex', backgroundColor : 'black', alignItems: 'center' ,height: '50px' }}>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>상품</Box>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>테이블</Box>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>주문 내역</Box>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>더보기</Box>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>
                    { notification ? <NotificationsIcon/> : <NotificationAddIcon sx={{color:'red'}}/>}
                </Box>
            </Box>
    );
}

export default Footer;