import { Box } from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import SaleAnalysisBar from './SaleAnalysisBar'
import SaleAnalysisDetailView from './SaleAnalysisDetailView'
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function SaleAnalysisView() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center', overflow: 'auto'}}>
            <Box sx={{ width: '500px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['StaticDateTimePicker']}>
                        <DemoItem>
                            <StaticDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
            <SaleAnalysisBar />
            <SaleAnalysisDetailView />
        </Box>
    )
}
