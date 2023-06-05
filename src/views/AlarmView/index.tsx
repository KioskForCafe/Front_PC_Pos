import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetAlarmResponseDto, PostAlarmResponseDto } from '../../apis/response/alarm';
import { GET_ALARM_LIST, POST_ALARM_URL, authorizationHeader } from '../../constants/api';
import { useCookies } from 'react-cookie';
import axios, { AxiosResponse } from 'axios';
import { useStoreStore } from '../../stores';
import ResponseDto from '../../apis/response';
import { PostAlarmRequestDto } from '../../apis/request/alarm';

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
        setAlarmResponse(data);
     }



     //          Error Handler           //

    const getAlarmErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const postAlarmErrorHandler = (error: any) => {
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
                            <Typography sx={{ mr: '20px'}}>{(alarm.createdAt + '').slice(0, 10) + ' ' + (alarm.createdAt + '').slice(11, 13) + '시' + (alarm.createdAt + '').slice(14, 16) + '분'}</Typography>
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
