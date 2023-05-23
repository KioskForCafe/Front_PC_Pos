import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import { AppBar, Box, Toolbar, Typography, FormControl, OutlinedInput, Button, Icon, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigationStore, useStoreStore } from '../../stores';
import dayjs, { Dayjs } from 'dayjs';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import { GET_STORE_URL } from '../../constants/api';
import { authorizationHeader } from '../../constants/api';
import ResponseDto from '../../apis/response';
import { GetStoreResponseDto } from '../../apis/response/store';
import useStore from '../../stores/user.store';
import { Navigation } from '../../constants/enum';
import useNavigation from '../../stores/navigation.store';


export default function NavigationBar() {

    const {setNavigation} = useNavigationStore();

    const { store, resetStore } = useStoreStore();
    const { user, setUser, resetUser } = useStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isStoreExist, setIsStoreExist] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(dayjs());

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const userMenuOpen = Boolean(anchorEl);
    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const [cookies, ,removeCookie] = useCookies();

    const accessToken = cookies.accessToken;

    //          Event Handler           //

    const onLogoutButtonHandler = () => {
        resetUser();
        resetStore();
        removeCookie('accessToken');
        setNavigation(Navigation.AuthenticationView);
    }

    const onStoreView = () => {
        if(!user){
            alert('로그인이 필요합니다.');
            return;
        }
        setNavigation(Navigation.Store);
    }

    //          Use Effect           //

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (store && store?.storeOpenTime !== null && store?.storeCloseTime !== null) {
            setIsOpen(currentTime.hour() >= store.storeOpenTime && currentTime.hour() < store.storeCloseTime);
        }
        if (!store) setIsOpen(false);
    }, [store, currentTime]);

    useEffect(() => {
        if (store) {
            setIsStoreExist(true);
        }
        if(!store) setIsStoreExist(false);
    }, [store])

    return (
        <Box sx={{ zIndex: 1, position: 'relative', top: '0', height: '7vh' }}>
            <AppBar variant='outlined' position='relative' sx={{ height: '100%', justifyContent: 'center', p: '0px 100px', backgroundColor: '#383947' }}>
                <Toolbar>
                    {isStoreExist ? <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#ffffff' } }}>{store?.storeName}</Typography> :
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#ffffff' } }}>Kiosk Project</Typography>}
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ fontSize: '15px', mt: '10px' }}>{currentTime.format('YYYY-MM-DD hh:mm')}</Typography>
                        {isOpen ? <IconButton sx={{ fontSize: '10px', ml: '10px', color: '#13ba50' }}>
                            <CircleIcon />
                        </IconButton> : <IconButton sx={{ fontSize: '10px', ml: '10px', color: '#ed1f11' }}>
                            <CircleIcon />
                        </IconButton>}
                        <Typography sx={{ fontSize: '15px', mt: '10px' }}>
                            {isOpen ? '영업중' : '영업 종료'}
                        </Typography>
                        <IconButton sx={{ fontSize: 'large', ml: '10px', color: '#ffffff' }} onClick={handleUserMenuClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={userMenuOpen}
                        onClose={handleUserMenuClose}
                        onClick={handleUserMenuClose}
                    >
                        <MenuItem onClick={() => onLogoutButtonHandler()}>로그아웃</MenuItem>
                        <MenuItem onClick={() => onStoreView()}>매장 리스트 보기</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
