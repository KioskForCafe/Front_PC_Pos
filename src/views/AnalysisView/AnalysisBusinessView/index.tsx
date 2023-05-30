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
import { GET_ANALYSIS_BUSINESS_URL, authorizationHeader } from '../../../constants/api';
import { useNavigate } from 'react-router-dom';
import ResponseDto from '../../../apis/response';
import { useCookies } from 'react-cookie';
import useStore from '../../../stores/user.store';
import User from '../../../interfaces/User.interface';
import { useStoreStore } from '../../../stores';

export default function AnalysisBusinessView() {


    const [startedAt, setStartedAt] = useState<Dayjs | null>(dayjs());
    const [endedAt, setEndedAt] = useState<Dayjs | null>(dayjs());
    const {store} = useStoreStore();
    const [analysisBusinessResponse, setAnalysisBusinessResponse] = useState<AnalysisBusinessResponseDto[] | null>(null);

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    //         Event Handler          //
    const getAnalysisBusiness = () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.')
            return;
        }

        axios.get(GET_ANALYSIS_BUSINESS_URL(store?.storeId+'', startedAt?.format('YYYY-MM-DD') as string, endedAt?.format('YYYY-MM-DD') as string), authorizationHeader(accessToken))
            .then((response) => getAnalysisBusinessResponseHandler(response))
            .catch((error) => getAnalysisBusinessErrorHandler(error));
    }

    const handleDatetimeChange = (startedAt: Dayjs, endedAt: Dayjs) => {
        setStartedAt(startedAt);
        setEndedAt(endedAt);
    };

    //              Response Handler                //

    const getAnalysisBusinessResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<AnalysisBusinessResponseDto[]>
        if (!result || !data) {
            alert(message);
            return;
        }
        setAnalysisBusinessResponse(data);
    }

    //          Error Handler           //

    const getAnalysisBusinessErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect              //

    useEffect(() => {
        if (startedAt && endedAt) getAnalysisBusiness();
        console.log();
    }, [store?.storeId, startedAt, endedAt]);

    return (
        <Box>
            <Typography sx={{ fontSize: '3vh', p: '3vh' }}>영업 분석</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                <SelectDatetimeView startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} onDatetimeChange={handleDatetimeChange} />
                {analysisBusinessResponse && analysisBusinessResponse.length > 0 ? 
                        <AnalysisBusinessDetail byTime={analysisBusinessResponse}/>
                 : (
                    <Typography sx={{mt: '10px'}}>데이터가 없습니다.</Typography>
                )}
            </Box>
        </Box>
    );
}