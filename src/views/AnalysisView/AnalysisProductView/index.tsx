import { Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import SelectDatetimeView from '../SelectDatetimeView';
import AnalysisProductDetail from './AnalysisProductDetail';
import axios, { AxiosResponse } from 'axios';
import { GET_ANALYSIS_MENU_URL } from '../../../constants/api';
import { AnalysisMenuResponseDto } from '../../../apis/response/analysis';
import ResponseDto from '../../../apis/response';
import { useNavigate } from 'react-router-dom';

export default function AnalysisProductView() {

    const navigator = useNavigate();

    const [startedAt, setStartedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [endedAt, setEndedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [storeId, setStoreId] = useState<string>('1');
    const [analysisProductResponse, setAnalysisProductResponse] = useState<AnalysisMenuResponseDto | null>(null);


    //         Event Handler          //
    const getAnalysisProduct = () => {
        axios.get(GET_ANALYSIS_MENU_URL(storeId as string, startedAt?.format('YYYY-MM-DD') as string, endedAt?.format('YYYY-MM-DD') as string))
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
            navigator('/');
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
        console.log();
    }, [storeId, startedAt, endedAt]);

    return (
        <Box>
            <Typography sx={{ fontSize: '3vh', p: '3vh' }}>상품 분석</Typography>
            <Box sx={{ mt: '2vh', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                <SelectDatetimeView startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} onDatetimeChange={handleDatetimeChange} />
                {analysisProductResponse != null &&
                    analysisProductResponse?.byCategory && analysisProductResponse.byCategory.length > 0 ? (
                    analysisProductResponse.byCategory.map((item) => (
                        <AnalysisProductDetail byCategory={analysisProductResponse.byCategory} byMenu={analysisProductResponse.byMenu} />
                    ))
                ) : (
                    <Typography>데이터가 없습니다.</Typography>
                )}
            </Box>
        </Box>

    )
}

