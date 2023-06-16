import { Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { Dispatch } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteStoreResponseDto, GetStoreResponseDto } from '../../apis/response/store';
import { useNavigationStore, useStoreStore } from '../../stores';
import { useCookies } from 'react-cookie';
import Store from '../../views/Store';
import axios, { AxiosResponse } from 'axios';
import { DELETE_STORE_URL, authorizationHeader } from '../../constants/api';
import ResponseDto from '../../apis/response';
import { Navigation } from '../../constants/enum';

interface Props{
    getStore: (accessToken: string) => void;
    item: GetStoreResponseDto;
}

export default function StoreCard({getStore, item} : Props) {

    const {setNavigation} = useNavigationStore();

    const {store, setStore,resetStore } = useStoreStore();
    const [cookies] = useCookies();
    const accessToken = cookies.accessToken;

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
        setNavigation(Navigation.Order);
    }

    const onKioskButtonHandler = () =>{
        const{...store} = item;
        setStore(store);
    }

    const onStoreUpdateButtonHandler = () => {
        const {...store} = item;
        setStore(store);
        setNavigation(Navigation.PatchStoreView);
    }

    const onStoreDeleteButtonHandler = () => {
        const {...store} = item;
        setStore(store);

        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        axios.delete(DELETE_STORE_URL(store?.storeId+''), authorizationHeader(accessToken))
            .then((response) => deleteStoreResponseHandler(response))
            .catch((error) => deleteStoreErrorHandler(error));

        resetStore();
        setNavigation(Navigation.Store);
    }


    const deleteStoreResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<DeleteStoreResponseDto>;
        if ( !result || !data || !data.result ) {
            alert(message);
            return;
        }
        getStore(accessToken);
    }

    const deleteStoreErrorHandler = (error: any) => {
        console.log(error.message);
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
                sx={{flex:3, backgroundSize:'contain', backgroundRepeat:'no-repeat' ,backgroundPosition:'center' ,backgroundImage: item.storeImgUrl ? `url(${item.storeImgUrl})` : 'url(https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg)'}}
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
                <Box onClick={()=>onKioskButtonHandler()} sx={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <a href={`http://localhost:8000/${store?.storeId}`} target='_blank' rel="noreferrer">
                        <Button >
                            매장 Kiosk
                        </Button>
                    </a>
                </Box>
            </Box>
            <Menu 
                anchorEl={anchorEl}
                open={storeMenuOpen}
                onClose={handleStoreMenuClose}
                onClick={handleStoreMenuClose} 
            >
            <MenuItem onClick={()=>onStoreUpdateButtonHandler()}>수정</MenuItem>
            <MenuItem onClick={()=>onStoreDeleteButtonHandler()}>삭제</MenuItem>
            </Menu>
        </Card>
    )
}
