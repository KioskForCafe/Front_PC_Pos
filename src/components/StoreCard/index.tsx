import { Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function StoreCard() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const storeMenuOpen = Boolean(anchorEl);
    const handleStoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleStoreMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ display:'flex', flexDirection:'column', maxWidth: 300 }}>
            <CardHeader
                sx={{flex:1}}
                action={
                    <IconButton onClick={handleStoreMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title="매장명"
                subheader="등록일"
            />
            <CardMedia
                component="img"
                sx={{flex:3}}
                height='100%'
                src="https://cdn.digitaltoday.co.kr/news/photo/202209/460929_431098_5441.jpg"
                // image='C:/Users/ghtjd/Desktop/workspace/team-project/front-project/src/static/images/noImage.jpg'
                // image="./static/images/noImage.jpg"
                alt="이미지"
            />
            <CardContent sx={{flex:1}}>
                <Typography variant="body2" color="text.secondary">
                영업시간 : 매장 오픈 시간 ~ 마감 시간
                </Typography>
            </CardContent>
            <Box sx={{flex:1, display: 'flex'}}>
                <Button sx={{flex:1}}>
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
