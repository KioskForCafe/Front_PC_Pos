import { Box, Typography } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react'
import AnalysisBusinessDetail from '../AnalysisBusinessView/AnalysisBusinessDetail'
import SelectDatetimeView from '../SelectDatetimeView';
import AnalysisProductDetail from './AnalysisProductDetail';

export default function AnalysisProductView() {

    const [startedAt, setStartedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));
    const [endedAt, setEndedAt] = useState<Dayjs | null>(dayjs('2023-05-10'));

    const handleDatetimeChange = (startedAt: Dayjs, endedAt: Dayjs) => {
        setStartedAt(startedAt);
        setEndedAt(endedAt);
      };

    return (
        <Box>
            <Typography sx={{ fontSize: '3vh', p: '3vh' }}>상품 분석</Typography>
            <Box sx={{ mt: '2vh', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                <SelectDatetimeView  startedAt={startedAt as Dayjs} endedAt={endedAt as Dayjs} onDatetimeChange={handleDatetimeChange} />
                <AnalysisProductDetail />
            </Box>
        </Box>

    )
}
