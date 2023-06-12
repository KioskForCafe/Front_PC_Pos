import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetAlarmResponseDto, PostAlarmResponseDto } from '../../apis/response/alarm';
import { GET_ALARM_LIST, POST_ALARM_URL, authorizationHeader } from '../../constants/api';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import { useStoreStore } from '../../stores';
import ResponseDto from '../../apis/response';
import { PostAlarmRequestDto } from '../../apis/request/alarm';
import dayjs, { Dayjs } from 'dayjs';

export default function AlarmView() {

    const [alarmResponse, setAlarmResponse] = useState<GetAlarmResponseDto[] | null>(null);
    
    const { store } = useStoreStore();

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;


    //         Event Handler          //

    const getAlarm = (accessToken: string) => {
        if (!accessToken) {
            alert('로그인이 필요합니다.')
            return;
        }

        if (store?.storeId == null) {
            alert('점포가 존재하지 않습니다.')
            return;
        }
        axios.get(GET_ALARM_LIST(store.storeId+''), authorizationHeader(accessToken))
        .then((response) => getAlarmResponseHandler(response))
        .catch((error) => getAlarmErrorHandler(error));
    }



     //              Response Handler                //

     const getAlarmResponseHandler = (response: AxiosResponse<any, any>) => {
        const {result, message, data} = response.data as ResponseDto<GetAlarmResponseDto[]>;
        if(!result || !data) {
            alert(message);
            return;
        }
        data.map((alarm) => {
            const createdAt: Dayjs = dayjs(alarm.createdAt);
            createdAt.add(9, 'hours');
            alarm.createdAt = createdAt.toDate();
        });

        setAlarmResponse(data);
     }



     //          Error Handler           //

    const getAlarmErrorHandler = (error: any) => {
        console.log(error.message);
    }


    //             Use Effect              //

    useEffect(() => {
        getAlarm(accessToken);
    }, [])
    

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '88vh', width: '100%', overflow: 'hidden'}}>
        <Box sx={{pl: '20px', display: 'flex', flex: 1, backgroundColor: '#E6E8EB'}}>
            <Box sx={{ p: '10px', flex: 1, display : 'flex', flexWrap: 'wrap', overflow: 'auto' }}>
                { alarmResponse && alarmResponse.map((alarm) => (
                    <Box sx={{  m: '10px', display: 'flex', flexDirection: 'column', backgroundColor: 'white', height: '8rem', borderRadius: '1rem', flex: '0 0 auto', marginBottom: '20px'}}>
                        <Box sx={{ p: '10px', display: 'flex', flex: 0.5, alignItems: 'center' }}>
                            <Typography sx={{ mr: '20px',fontSize: '25px', fontWeight: 600 }}>{alarm.alarmId}</Typography>
                            <Typography sx={{ mr: '20px'}}>{alarm.createdAt.getFullYear()+ '년 ' + alarm.createdAt.getMonth() + '월 ' + alarm.createdAt.getDate() + '일 ' + alarm.createdAt.getHours() + '시 ' + alarm.createdAt.getMinutes() + '분' }</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{p: '10px', flex: 3, flexDirection: 'column'}}>
                            <Typography sx={{ flex: 1, fontsize: '30px' }}>{alarm.alarmMessage}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    </Box>
  )
}
