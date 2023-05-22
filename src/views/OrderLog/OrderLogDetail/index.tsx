import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetOrderDetailListResponseDto, GetOrderListResponseDto } from '../../../apis/response/order';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../../apis/response';
import { GET_ORDER_DETAIL_LIST_URL, authorizationHeader } from '../../../constants/api';
import useStore from '../../../stores/user.store';
import { useStoreStore } from '../../../stores';
import User from '../../../interfaces/User.interface';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface props {
    orderId: number
}

export default function OrderLogDetail({orderId}: props) {

    const navigator = useNavigate();

    const [orderDetailResponse, setOrderDetailResponse] = useState<GetOrderDetailListResponseDto[] | null>(null);
    const { store } = useStoreStore();

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;
    
    //      Event Handler           //

    const getOrderDetail = (orderId: number, accessToken: string) => {

        axios.get(GET_ORDER_DETAIL_LIST_URL(orderId + ''), authorizationHeader(accessToken))
            .then((response) => getOrderDetailResponseHandler(response))
            .catch((error) => getOrderDetailErrorHandler(error));
    }

    //          Response Handler        //

    const getOrderDetailResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetOrderDetailListResponseDto[]>;
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
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
                        <Typography>{menu.menuName}</Typography>
                        <Typography>ㄴ{menu.optionList}</Typography>
                    </Box>
                    <Typography sx={{ flex: 1 }}>{menu.count}</Typography>
                </Box>
            )}
        </Box>

    )
}
