import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import { AppBar, Box, Toolbar, Typography, FormControl, OutlinedInput, Button, Icon, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStoreStore } from '../../stores';
import dayjs, { Dayjs } from 'dayjs';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import { GET_STORE_URL } from '../../constants/api';
import { authorizationHeader } from '../../constants/api';
import ResponseDto from '../../apis/response';
import { GetStoreResponseDto } from '../../apis/response/store';


export default function NavigationBar() {

    const { store } = useStoreStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(dayjs());

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

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
    }, [store, currentTime]);


    return (
        <Box sx={{ zIndex: 1, position: 'relative', top: '0', height: '7vh' }}>
            <AppBar variant='outlined' position='relative' sx={{ height: '100%', justifyContent: 'center', p: '0px 100px', backgroundColor: '#383947' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: '#ffffff' } }}>Kiosk Project</Typography>
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
                        <IconButton sx={{ fontSize: 'large', ml: '10px', color: '#ffffff' }}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
