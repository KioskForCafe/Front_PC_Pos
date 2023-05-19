import { Box, Card, CardContent, Divider, Icon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AnalysisTop10CustomerView from '../AnalysisTop10CustomerView'
import dayjs, { Dayjs } from 'dayjs'
import { useStoreStore, useUserStore } from '../../../../stores'
import { GET_USER_ANALYSIS_URL, authorizationHeader } from '../../../../constants/api'
import { useCookies } from 'react-cookie'
import axios, { AxiosResponse } from 'axios'
import { AnalysisUserResponseDto } from '../../../../apis/response/analysis'
import ResponseDto from '../../../../apis/response'

interface props {
    startedAt: Dayjs,
    endedAt: Dayjs
}

export default function AnalysisCustomerDetail({ startedAt, endedAt }: props) {

    const { store } = useStoreStore();

    const [newVisitedUserCount, setNewVisitedUserCount] = useState<number | null>(null);
    const [totalVisitedUserCount, setTotalVisitedUserCount] = useState<number | null>(null);
    const [userTop10List, setUserTop10List] = useState<{
        userId: string;
        userName: string;
        telNumber: string;
        visitedCount: number;
        point: number;
        amountPayment: number;
    }[]>([]);

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    //         Event Handler          //

    const getAnalysisCustomer = (accessToken: string) => {
        if (!accessToken) {
            alert('로그인이 필요합니다.')
            return;
        }

        axios.get(GET_USER_ANALYSIS_URL(store?.storeId+'', startedAt?.format('YYYY-MM-DD') as string, endedAt?.format('YYYY-MM-DD') as string), authorizationHeader(accessToken))
            .then((response) => getAnalysisCustomerResponseHandler(response))
            .catch((error) => getAnalysisCustomerErrorHandler(error));
    }

    //              Response Handler                //


    const getAnalysisCustomerResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<AnalysisUserResponseDto>
        if (!result || !data) {
            alert(message);
            return;
        }
        setAnalysisCustomerResponse(data);
    }

    //          Error Handler           //

    const getAnalysisCustomerErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          function            //

    const setAnalysisCustomerResponse = (data: AnalysisUserResponseDto) => {
        const { newVisitedUserCount, totalVisitedUserCount, userTop10List } = data;
        setNewVisitedUserCount(newVisitedUserCount);
        setTotalVisitedUserCount(totalVisitedUserCount);
        setUserTop10List(userTop10List);
        console.log(newVisitedUserCount, totalVisitedUserCount, userTop10List);
    }


    //          Use Effect          //

    useEffect(() => {
        if (startedAt && endedAt) getAnalysisCustomer(accessToken);
    }, [store?.storeId, startedAt, endedAt]);

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >총 고객</Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>{totalVisitedUserCount}</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >신규 고객</Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>{newVisitedUserCount}</Typography>
                        </Box>
                        {/* <Divider orientation='vertical' flexItem /> */}
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >회원 평균 방문 수</Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>{}</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem /> */}
                    </Box>
                </CardContent>
            </Card>
            <Box sx={{ p: '1vh' }}>
                {(userTop10List !== null && userTop10List.length > 0 ) ? (
                <AnalysisTop10CustomerView userTop10List={userTop10List} />
                ) : (
                    <Typography>데이터가 없습니다.</Typography>
                )}

            </Box>
        </Box>
    )
}
