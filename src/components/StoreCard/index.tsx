import { Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { Dispatch } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GetStoreResponseDto } from '../../apis/response/store';
import { useStoreStore } from '../../stores';

interface Props{
    setNode: Dispatch<React.SetStateAction<string>>;
    item: GetStoreResponseDto;
}

export default function StoreCard({item, setNode} : Props) {

    const {setStore } = useStoreStore();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const storeMenuOpen = Boolean(anchorEl);
    const handleStoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleStoreMenuClose = () => {
        setAnchorEl(null);
    };

    const onPosButtonHandler = () =>{
        const {...store} = item;
        setStore(store);
        setNode('Order');
    }

    return (
        <Card sx={{flex:1, mx:'15px', display:'inline-flex', flexDirection:'column', maxWidth: 300 }}>
            <CardHeader
                sx={{flex:1}}
                action={
                    <IconButton onClick={handleStoreMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.storeName}
            />
            <Box
                sx={{flex:3, backgroundSize:'cover' ,backgroundImage: item.storeImgUrl || 'url(https://cdn.digitaltoday.co.kr/news/photo/202209/460929_431098_5441.jpg)'}}
            ></Box>
            <CardContent sx={{flex:1}}>
                <Typography variant="body2" color="text.secondary">
                영업시간
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {`${item.storeOpenTime} ~ ${item.storeCloseTime}`}
                </Typography>
            </CardContent>
            <Box sx={{flex:1, display: 'flex'}}>
                <Button onClick={()=>onPosButtonHandler()} sx={{flex:1}}>
                    매장 PC 포스
                </Button>
                <Button sx={{flex:1}}>
                    매장 Kiosk
                </Button>
            </Box>

            <Menu 
                anchorEl={anchorEl}
                open={storeMenuOpen}
                onClose={handleStoreMenuClose}
                onClick={handleStoreMenuClose} 
            >
            <MenuItem onClick={handleStoreMenuClose}>수정</MenuItem>
            <MenuItem onClick={handleStoreMenuClose}>삭제</MenuItem>
            </Menu>
        </Card>
    )
}
