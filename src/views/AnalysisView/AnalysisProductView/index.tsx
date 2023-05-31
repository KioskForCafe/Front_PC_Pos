import { Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import SelectDatetimeView from '../SelectDatetimeView';
import AnalysisProductDetail from './AnalysisProductDetail';
import axios, { AxiosResponse } from 'axios';
import { GET_ANALYSIS_MENU_URL, authorizationHeader } from '../../../constants/api';
import { AnalysisMenuResponseDto } from '../../../apis/response/analysis';
import ResponseDto from '../../../apis/response';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useStore from '../../../stores/user.store';
import User from '../../../interfaces/User.interface';
import { useStoreStore } from '../../../stores';

export default function AnalysisProductView() {

    const { store } = useStoreStore();

    const [startedAt, setStartedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [endedAt, setEndedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [analysisProductResponse, setAnalysisProductResponse] = useState<AnalysisMenuResponseDto | null>(null);

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    //         Event Handler          //
    const getAnalysisProduct = () => {

        if (!accessToken) {
            alert('로그인이 필요합니다.')
            return;
        }

        axios.get(GET_ANALYSIS_MENU_URL(store?.storeId + '', startedAt?.format('YYYY-MM-DD') as string, endedAt?.format('YYYY-MM-DD') as string), authorizationHeader(accessToken))
            .then((response) => getAnalysisProductResponseHandler(response))
            .catch((error) => getAnalysisProductErrorHandler(error));
    }
    const handleDatetimeChange = (startedAt: Dayjs, endedAt: Dayjs) => {
        setStartedAt(startedAt);
        setEndedAt(endedAt);
    };

    //              Response Handler                //

    const getAnalysisProductResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<AnalysisMenuResponseDto>
        if (!result || !data) {
            alert(message);
            return;
        }
        setAnalysisProductResponse(data);
    }

    //          Error Handler           //

    const getAnalysisProductErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect              //

    useEffect(() => {
        if (startedAt && endedAt) getAnalysisProduct();
    }, [store?.storeId, startedAt, endedAt]);

    return (
        <Box>
            <Typography sx={{ fontSize: '3vh', p: '3vh' }}>상품 분석</Typography>
            <Box sx={{ mt: '2vh', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                <SelectDatetimeView startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} onDatetimeChange={handleDatetimeChange} />
                {analysisProductResponse !== null && analysisProductResponse.byCategory.length > 0 && analysisProductResponse.byMenu.length > 0 ? (
                    <AnalysisProductDetail byCategory={analysisProductResponse.byCategory} byMenu={analysisProductResponse.byMenu} />
                ) : (
                    <Typography sx={{mt: '10px'}}>데이터가 없습니다.</Typography>
                )}
            </Box>
        </Box>

    )
}

