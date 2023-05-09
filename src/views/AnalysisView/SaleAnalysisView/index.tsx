import { Box, Typography } from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import SaleAnalysisDetail from './SaleAnalysisDetail';
import SelectDatetimeView from '../SelectDatetimeView';

export default function SaleAnalysisView() {
    return (
        <Box>
            <Typography align='left' sx={{fontSize: '3vh', p: '3vh' }}>매출 분석</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
                <SelectDatetimeView />
                <SaleAnalysisDetail />
            </Box>
        </Box>

    )
}
