import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { GET_ORDER_LOG_LIST_URL, authorizationHeader } from '../../constants/api';
import useStore from '../../stores/user.store';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../apis/response';
import { AnalysisBusinessResponseDto } from '../../apis/response/analysis';
import User from '../../interfaces/User.interface';
import { GetOrderListResponse } from '../../apis/response/order';


function OrderLog() {

    const navigator = useNavigate();

    const [orderLogResponse, setorderLogResponse] = useState<GetOrderListResponse[] | null>(null);

    const { user } = useStore();
    const [addUser, setAddUser] = useState<User | null>(null);

    const [cookies] = useCookies();
    const [storeId, setStoreId] = useState<string>('');

    const accessToken = cookies.accessToken;

    //         Event Handler          //
    const getOrderLog = (accessToken: string) => {
        if (!accessToken) {
            alert('로그인이 필요합니다.')
            return;
        }

        if (addUser?.userId !== user?.userId) {
            alert('권한이 없습니다.')
            return;
        }

        axios.get(GET_ORDER_LOG_LIST_URL(storeId as string), authorizationHeader(accessToken))
            .then((response) => getOrderLogResponseHandler(response))
            .catch((error) => getOrderLogErrorHandler(error));
    }


    //              Response Handler                //

    const getOrderLogResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetOrderListResponse[]>;
        if (!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        setorderLogResponse(data);
    }

    //          Error Handler           //

    const getOrderLogErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect              /

    useEffect(() => {
        if (storeId !== null) getOrderLog(accessToken);
        console.log();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '88vh' }}>
            <Box sx={{ display: 'flex', border: '1px solid #FFFFFF', height: '3.5rem', alignItems: 'center' }}>
                <Box sx={{ flex: 1, textAlign: 'center', color: 'grey' }}>대기</Box>
                <Box sx={{ flex: 1, textAlign: 'center', color: 'grey' }}>접수</Box>
                <Box sx={{ flex: 1, textAlign: 'center', color: 'grey' }}>완료</Box>
            </Box>

            <Box sx={{ p: '10px', backgroundColor: '#E6E8EB', flex: 1 }}>
                {orderLogResponse?.map((order) =>
                    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '15rem', height: '20rem', borderRadius: '1rem' }}>
                        <Box sx={{ p: '10px', display: 'flex', flex: 0.5 }}>
                            <Typography sx={{ flex: 1 }}>{order.orderId}</Typography>
                            <Typography sx={{ flex: 1, textAlign: 'end' }}>{order.createAt.toString()}</Typography>
                        </Box>
                        <Box sx={{ px: '10px', flex: 3, flexDirection: 'column' }}>
                            {order.orderDetailList.map((menu) =>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
                                        <Typography>{menu.menuName}</Typography>
                                        <Typography>ㄴ{menu.optionList}</Typography>
                                    </Box>
                                    <Typography sx={{ flex: 1 }}>{menu.count}</Typography>
                                </Box>
                            )}
                        </Box>
                        {/* <Box sx={{ p: '10px', position: 'relative', bottom: '0', flex: 0.5, borderTop: '2px solid #f1f3f4', borderRadius: '0 0 1rem 1rem' }}>
                            <Typography>2품목{}</Typography>
                        </Box> */}
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