import { Badge, Box, Button, IconButton } from '@mui/material';
import React, { Dispatch } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';

interface Props{
    setNode: Dispatch<React.SetStateAction<string>>;
}

function Footer({setNode} : Props) {
    return (
            <Box sx={{position: 'relative', zIndex: 999, width:'100%' , display: 'flex', backgroundColor : 'black', alignItems: 'center' ,height: '5vh' }}>
                <Button onClick={()=>setNode('Order')} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>주문</Button>
                <Button onClick={()=>setNode('CustomMenu')} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>상품</Button>
                <Button onClick={()=>setNode('OrderLog')} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>주문내역</Button>
                <Button onClick={()=>setNode('AnalysisView')} sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>매장분석</Button>
                <Box sx={{flex:1, textAlign:'center', fontWeight: 'bold', color:'grey'}}>
                    <Button>
                        <Badge badgeContent="" color='primary' variant='dot'>
                            <NotificationsIcon/>
                        </Badge>
                    </Button>
                </Box>
            </Box>
    );
}

export default Footer;