import { Box, Typography } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react'
import SaleAnalysisDetail from '../SaleAnalysisView/SaleAnalysisDetail';
import AnalysisBusinessDetail from './AnalysisBusinessDetail';
import SelectDatetimeView from '../SelectDatetimeView';
import { AnalysisBusinessResponseDto } from '../../../apis/response/analysis';
import axios, { AxiosResponse } from 'axios';
import { GET_ANALYSIS_BUSINESS_URL } from '../../../constants/api';
import { useNavigate } from 'react-router-dom';
import ResponseDto from '../../../apis/response';

export default function AnalysisBusinessView() {

    const navigator = useNavigate();

    const [startedAt, setStartedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [endedAt, setEndedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [time, setTime] = useState<number>();
    
    const [storeId, setStoreId] = useState<string>('1');
    const [saleAmount, setSaleAmount] = useState<number>();
    const [saleCount, setSaleCount] = useState<number>();

    //         Event Handler          //
    const getAnalysisBusiness = () => {
        axios.get(GET_ANALYSIS_BUSINESS_URL(storeId as string, startedAt?.format('YYYY-MM-DD') as string, endedAt?.format('YYYY-MM-DD') as string))
            .then((response) => getAnalysisBusinessResponseHandler(response))
            .catch((error) => getAnalysisBusinessErrorHandler(error));
    }

    const handleDatetimeChange = (startedAt: Dayjs, endedAt: Dayjs) => {
        setStartedAt(startedAt);
        setEndedAt(endedAt);
    };

    //              Response Handler                //

    const getAnalysisBusinessResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<AnalysisBusinessResponseDto>
        if (!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        setAnalysisBusinessResponse(data);
    }

    //          Error Handler           //

    const getAnalysisBusinessErrorHandler = (error: any) => {
        console.log(error.message);
    }


    //          function            //

    const setAnalysisBusinessResponse = (data: AnalysisBusinessResponseDto) => {
        const { saleAmount, saleCount, time } = data;
        setSaleAmount(saleAmount);
        setSaleCount(saleCount);
        setTime(time);
    }

    //          Use Effect              //

    useEffect (() => {
        getAnalysisBusiness();
    });

    return (
        <Box>
            <Typography sx={{ fontSize: '3vh', p: '3vh' }}>영업 분석</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                <SelectDatetimeView startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} onDatetimeChange={handleDatetimeChange} />
                <AnalysisBusinessDetail time={time as number} saleAmount={saleAmount as number} saleCount={saleCount as number}/>
            </Box>
        </Box>

    )
}
