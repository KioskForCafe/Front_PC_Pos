import { Badge, Box, Button, IconButton } from '@mui/material';
import React, { Dispatch } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { useNavigationStore } from '../../stores';
import { Navigation } from '../../constants/enum';

function Footer() {

    const {setNavigation} = useNavigationStore();
    return (
            <Box sx={{position: 'relative', zIndex: 999, width:'100%' , display: 'flex', backgroundColor : 'black', alignItems: 'center' ,height: '5vh' }}>
                <Button onClick={()=>setNavigation(Navigation.Order)} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>주문</Button>
                {/* <Button onClick={()=>setNavigation(Navigation.CustomMenu)} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>상품</Button> */}
                <Button onClick={()=>setNavigation(Navigation.OrderLog)} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>주문내역</Button>
                <Button onClick={()=>setNavigation(Navigation.AnalysisView)} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>매장분석</Button>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>
                    <Button onClick={() => setNavigation(Navigation.AlarmView)}>
                        <Badge badgeContent="" color='primary' variant='dot'>
                            <NotificationsIcon/>
                        </Badge>
                    </Button>
                </Box>
            </Box>
    );
}

export default Footer;