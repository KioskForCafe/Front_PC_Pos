import { Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'
import SelectDatetimeView from '../SelectDatetimeView'
import AnalysisCustomerDetail from './AnalysisCustomerDetail'

export default function AnalysisCustomerView() {

    const [startedAt, setStartedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [endedAt, setEndedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));

    const handleDatetimeChange = (startedAt: Dayjs, endedAt: Dayjs) => {
        setStartedAt(startedAt);
        setEndedAt(endedAt);
      };

    return (
        <Box>
            <Typography align='left' sx={{fontSize: '3vh', p: '3vh' }}>고객 분석</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SelectDatetimeView startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} onDatetimeChange={handleDatetimeChange} />
                <AnalysisCustomerDetail startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} />
            </Box>
        </Box>

    )
}
