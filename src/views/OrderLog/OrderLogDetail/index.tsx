import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { GetOrderDetailListResponseDto, GetOrderListResponseDto, PatchOrderResponseDto, PostOrderLogResponseDto } from '../../../apis/response/order';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../../apis/response';
import { GET_ORDER_DETAIL_LIST_URL, authorizationHeader, PATCH_ORDER_URL, POST_ORDER_LOG_URL } from '../../../constants/api';
import useStore from '../../../stores/user.store';
import { useStoreStore, useUserStore } from '../../../stores';
import User from '../../../interfaces/User.interface';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PatchOrderRequestDto, PostOrderLogRequestDto } from '../../../apis/request/order';
import { OrderState } from '../../../constants/enum';

interface props {
    order : GetOrderListResponseDto;
    orderLogResponse: GetOrderListResponseDto[];
    setOrderLogResponse: React.Dispatch<React.SetStateAction<GetOrderListResponseDto[] | null>>;
}

export default function OrderLogDetail({ setOrderLogResponse,orderLogResponse, order }: props) {

    const {user} = useUserStore();
    const {store} = useStoreStore();

    const [orderDetailResponse, setOrderDetailResponse] = useState<GetOrderDetailListResponseDto[]>([]);
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
            orderId : order.orderId,
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

        const data : PostOrderLogRequestDto = {
            createdAt: order.updatedAt,
            orderDetail : [...orderDetailResponse].map((orderDetail)=>{
                const result = {...orderDetail,storeId:store!.storeId, storeName:store!.storeName};
                return result;
            }),
            orderId : order.orderId,
            storeId : store!.storeId,
            storeName : store!.storeName,
            telNumber : user!.telNumber,
            userId : user!.userId,
            userName : user!.userName,
            totalPrice: order.totalPrice
        }

        axios
            .post(POST_ORDER_LOG_URL, data, authorizationHeader(accessToken))
            .then((response)=> postOrderLogResponseHandler(response))
            .catch((error)=>postOrderLogErrorHandler(error))


    }

    const onRejectButtonHandler = () => {
        const newState = OrderState.REJECT;
        patchOrderState(accessToken, newState);
    }

    //          Response Handler        //

    const postOrderLogResponseHandler = (response: AxiosResponse<any, any>) => {
        const {data,message,result} = response.data as ResponseDto<PostOrderLogResponseDto>;
        if(!result || !data){
            alert(message);
            return;
        }
        const newState = OrderState.COMPLETE;
        patchOrderState(accessToken, newState);
    }

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
        setOrderLogResponse(data);
    }


    //          Error Handler           //

    const postOrderLogErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const getOrderDetailErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const patchOrderStateErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect              /

    useEffect(() => {
        getOrderDetail(order.orderId, accessToken);
    }, [orderLogResponse]);

    return (
        <Box>
            <Box sx={{height: '8rem',overflow: 'hidden' ,textOverflow: 'ellipsis'}}>
                {orderDetailResponse?.map((menu) =>
                    <Box sx={{ display: 'flex', mb: '7px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: 550}}>{menu.menuName}</Typography>
                            {menu.optionList.map((option, index) => (
                                <Typography key={index}>{option.optionName}<br /></Typography>
                            ))}
                        </Box>
                        <Typography sx={{ flex: 1, fontSize: '20px', fontWeight: 550, textAlign: 'end', mr: '5px' }}>{menu.count}</Typography>
                    </Box>
                )}
            </Box>
            <Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    {
                        order.orderState === OrderState.WAITING ? (<Button sx={{ flex: 1 }} onClick={() => onUpdateButtonHandler()}>접수</Button>) :
                            order.orderState === OrderState.CONFIRM && (<Button sx={{ flex: 1 }} onClick={() => onCompleteButtonHandler()}>완료</Button>)
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
                                        <Typography key={index}>{option.optionName}<br /></Typography>
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
