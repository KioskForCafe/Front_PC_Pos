import { Box } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import AnalysisBusinessDetail from '../AnalysisBusinessView/AnalysisBusinessDetail'

export default function AnalysisProductView() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '500px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['StaticDatePicker']}>
                        <DemoItem>
                            <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
        </Box>
    )
}
