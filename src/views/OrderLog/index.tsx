import { Box, Button, Divider, Icon, IconButton, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { GET_ORDER_LOG_LIST_URL, GET_ORDER_STATE_COUNT, authorizationHeader } from '../../constants/api';
import useStore from '../../stores/user.store';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../apis/response';
import User from '../../interfaces/User.interface';
import { GetOrderDetailListResponseDto, GetOrderListResponseDto, GetOrderStateResponseDto } from '../../apis/response/order';
import { useStoreStore } from '../../stores';
import OrderLogDetail from './OrderLogDetail';
import { Navigation, OrderState } from '../../constants/enum';
import CircleIcon from '@mui/icons-material/Circle';


function OrderLog() {


    const [orderLogResponse, setOrderLogResponse] = useState<GetOrderListResponseDto[] | null>(null);

    // const [orderLogCountResponse, setOrderLogCountResponse] = useState<GetOrderListCountResponseDto>(0);

    const [orderState, setOrderState] = useState<string>(OrderState.WAITING);
    const [orderStateCounts, setOrderStateCounts] = useState<GetOrderStateResponseDto[]>([]);

    const { store } = useStoreStore();

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    //         Event Handler          //
    const getOrderLog = (accessToken: string) => {
        if (!accessToken) {
            alert('로그인이 필요합니다.')
            return;
        }

        if (store?.storeId == null) {
            alert('점포가 존재하지 않습니다.')
            return;
        }

        axios.get(GET_ORDER_LOG_LIST_URL(store.storeId+'', orderState), authorizationHeader(accessToken))
            .then((response) => getOrderLogResponseHandler(response))
            .catch((error) => getOrderLogErrorHandler(error));

    }

    const getOrderStateCount = (accessToken: string) => {
        axios.get(GET_ORDER_STATE_COUNT(store?.storeId+''), authorizationHeader(accessToken))
        .then((response) => getOrderStateCountResponseHandler(response))
        .catch((error) => getOrderStateCountErrorHandler(error));
    }

    const stateNameMapping: Record<string, string> = {
        Waiting: '대기',
        Confirm: '접수',
        Complete: '완료'
      };

    //              Response Handler                //

    const getOrderLogResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetOrderListResponseDto[]>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setOrderLogResponse(data);
    }

    const getOrderStateCountResponseHandler = (response: AxiosResponse<any,any>) => {
        const {result, message, data} = response.data as ResponseDto<GetOrderStateResponseDto[]>;
        if(!result || !data) {
            alert(message);
            return;
        }
        setOrderStateCounts(data);
    }


    //          Error Handler           //

    const getOrderLogErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const getOrderStateCountErrorHandler = (error: any) => {
        console.log(error.message);
    }


    //          Use Effect              /

    useEffect(() => {
        getOrderLog(accessToken);
        // getOrderLogCount(accessToken);
    }, [orderState]);

    useEffect(() => {
      getOrderStateCount(accessToken);
      }, [orderStateCounts]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '88vh', width: '100%', overflow: 'hidden'}}>
            <Box sx={{ display: 'flex', border: '1px solid #FFFFFF', height: '5vh', alignItems: 'center' }}>
                <Button sx={{ flex: 1, textAlign: 'center', color: 'grey', bgcolor: orderState===OrderState.WAITING ? '#1976d250' : '' }} onClick={() => setOrderState(OrderState.WAITING)}>대기</Button>
                <Button sx={{ flex: 1, textAlign: 'center', color: 'grey', bgcolor: orderState===OrderState.CONFIRM ? '#1976d250' : '' }} onClick={() => setOrderState(OrderState.CONFIRM)}>접수</Button>
                <Button sx={{ flex: 1, textAlign: 'center', color: 'grey', bgcolor: orderState===OrderState.COMPLETE ? '#1976d250' : '' }} onClick={() => setOrderState(OrderState.COMPLETE)}>완료</Button>
            </Box>
            <Box sx={{pt: '10px', pl: '20px', display: 'flex', backgroundColor: '#E6E8EB'}}> {
                orderStateCounts.map((stateCount) => (
                <Typography key={stateCount.orderState} sx={{ mr: '10px', fontSize: '1.2rem',fontWeight: 600}}>{stateNameMapping[stateCount.orderState]}: {stateCount.orderStateCount}건</Typography>
                ))
            }
            </Box>
            <Box sx={{ width: '100%', p: '10px', backgroundColor: '#E6E8EB', flex: 1, display : 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'auto' }}>
                {orderLogResponse && orderLogResponse?.map?.((order) =>
                    <Box sx={{  m: '10px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '15rem', height: '17rem', borderRadius: '1rem', flex: '0 0 auto', marginBottom: '20px' }}>
                        <Box sx={{ p: '10px', display: 'flex', flex: 0.5, alignItems: 'center' }}>
                            <Typography sx={{ flex: 0.3, fontSize: '25px', fontWeight: 600 }}>{order.orderId}</Typography>
                            <Typography sx={{ flex: 1, textAlign: 'end' }}>{(order.updatedAt + '').slice(0, 10) + ' ' + (order.updatedAt + '').slice(11, 13) + '시' + (order.updatedAt + '').slice(14, 16) + '분'}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: '10px', flex: 3, flexDirection: 'column' }}>
                            <OrderLogDetail orderLogResponse={orderLogResponse} setOrderLogResponse={setOrderLogResponse} order={order}/>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box sx={{ px: '1rem', height: '3.5rem', display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ mx: '5px' }}>
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton sx={{ mx: '5px' }}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default OrderLog;