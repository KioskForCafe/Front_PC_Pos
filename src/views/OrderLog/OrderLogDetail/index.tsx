import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetOrderDetailResponse, GetOrderResponse } from '../../../apis/response/order';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../../apis/response';
import { GET_ORDER_DETAIL_LIST_URL, authorizationHeader } from '../../../constants/api';
import useStore from '../../../stores/user.store';
import { useStoreStore } from '../../../stores';
import User from '../../../interfaces/User.interface';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface props {
    orderId: number
}

export default function OrderLogDetail({ orderId }: props) {

    const navigator = useNavigate();

    const [orderDetailResponse, setOrderDetailResponse] = useState<GetOrderDetailResponse[] | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const { store } = useStoreStore();

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    //      Event Handler           //

    const getOrderDetail = (orderId: number, accessToken: string) => {

        axios.get(GET_ORDER_DETAIL_LIST_URL(orderId + ''), authorizationHeader(accessToken))
            .then((response) => getOrderDetailResponseHandler(response))
            .catch((error) => getOrderDetailErrorHandler(error));
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //          Response Handler        //

    const getOrderDetailResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetOrderDetailResponse[]>;
        if (!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        console.log(data);
        setOrderDetailResponse(data);
    }

    //          Error Handler           //

    const getOrderDetailErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect              /

    useEffect(() => {
        getOrderDetail(orderId, accessToken);
        console.log();
    }, []);

    return (
        <Box>
            {orderDetailResponse?.map((menu) =>
                <Box sx={{ display: 'flex', mb: '7px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: 550 }}>{menu.menuName}</Typography>
                        {menu.optionList.map((option, index) => (
                            <Typography key={index}>{option}<br /></Typography>
                        ))}
                    </Box>
                    <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: 550, textAlign: 'end', mr: '5px' }}>{menu.count}</Typography>
                </Box>
            )}
            <Box>
                <IconButton onClick={handleOpenDialog} sx={{ alignContent: 'center', width: '100%' }}><ExpandMoreIcon /></IconButton>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle sx={{ fontSize: '30px', fontWeight: 600 }}>주문 상세</DialogTitle>
                    <Divider />
                    <DialogContent>
                        {orderDetailResponse?.map((menu, index) => (
                            <Box key={index} sx={{ display: 'flex', width: '30rem', mb: '7px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
                                    <Typography sx={{ fontSize: '20px', fontWeight: 550 }}>{menu.menuName}</Typography>
                                    {menu.optionList.map((option, index) => (
                                        <Typography key={index}>{option}<br /></Typography>
                                    ))}
                                </Box>
                                <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: 550, textAlign: 'end', mr: '5px' }}>{menu.count}</Typography>
                            </Box>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>

    )
}
