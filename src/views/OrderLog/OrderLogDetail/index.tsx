import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { GetOrderDetailListResponseDto, GetOrderListResponseDto, PatchOrderResponseDto } from '../../../apis/response/order';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../../apis/response';
import { GET_ORDER_DETAIL_LIST_URL, authorizationHeader, PATCH_ORDER_URL } from '../../../constants/api';
import useStore from '../../../stores/user.store';
import { useStoreStore } from '../../../stores';
import User from '../../../interfaces/User.interface';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PatchOrderRequestDto } from '../../../apis/request/order';
import { OrderState } from '../../../constants/enum';

interface props {
    orderId: number;
    orderState: string;
    setOrderLogResponse: React.Dispatch<React.SetStateAction<GetOrderListResponseDto[] | null>>
}

export default function OrderLogDetail({ setOrderLogResponse, orderId, orderState }: props) {

    const navigator = useNavigate();

    const [orderDetailResponse, setOrderDetailResponse] = useState<GetOrderDetailListResponseDto[] | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

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

    const patchOrderState = (accessToken: string, orderState: string) => {
        const data: PatchOrderRequestDto = {
            orderId,
            orderState
        }
        axios.patch(PATCH_ORDER_URL, data, authorizationHeader(accessToken))
            .then((response) => patchOrderStateResponseHandler(response))
            .catch((error) => patchOrderStateErrorHandler(error));
    }

    const onUpdateButtonHandler = () => {
        const newState = OrderState.CONFIRM;
        patchOrderState(accessToken, newState);
    }

    const onCompleteButtonHandler = () => {
        const newState = OrderState.COMPLETE;
        patchOrderState(accessToken, newState);
    }

    const onRejectButtonHandler = () => {
        const newState = OrderState.REJECT;
        patchOrderState(accessToken, newState);
    }

    //          Response Handler        //

    const getOrderDetailResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetOrderDetailListResponseDto[]>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setOrderDetailResponse(data);
    }

    const patchOrderStateResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PatchOrderResponseDto[]>;
        if (!result || !data) {
            alert(message);
            return;
        }
        console.log(data);
        setOrderLogResponse(data);
    }

    //          Error Handler           //

    const getOrderDetailErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const patchOrderStateErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect              /

    useEffect(() => {
        getOrderDetail(orderId, accessToken);
    }, []);

    return (
        <Box>
            <Box sx={{height: '8rem',overflow: 'hidden' ,textOverflow: 'ellipsis'}}>
                {orderDetailResponse?.map((menu) =>
                    <Box sx={{ display: 'flex', mb: '7px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: 550}}>{menu.menuName}</Typography>
                            {menu.optionList.map((option, index) => (
                                <Typography key={index}>{option}<br /></Typography>
                            ))}
                        </Box>
                        <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: 550, textAlign: 'end', mr: '5px' }}>{menu.count}</Typography>
                    </Box>
                )}
            </Box>
            <Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    {
                        orderState === OrderState.WAITING ? (<Button sx={{ flex: 1 }} onClick={() => onUpdateButtonHandler()}>접수</Button>) :
                            orderState === OrderState.CONFIRM && (<Button sx={{ flex: 1 }} onClick={() => onCompleteButtonHandler()}>완료</Button>)
                    }

                    <Button sx={{ flex: 1 }} onClick={() => onRejectButtonHandler()}>취소</Button>
                </Box>
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
