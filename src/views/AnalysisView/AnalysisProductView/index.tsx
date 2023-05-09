import { Box } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import AnalysisBusinessDetail from '../AnalysisBusinessView/AnalysisBusinessDetail'
import SelectDatetimeView from '../SelectDatetimeView';
import AnalysisProductDetail from './AnalysisProductDetail';

export default function AnalysisProductView() {
    return (
        <Box sx={{ mt: '2vh', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
            <SelectDatetimeView />
            <AnalysisProductDetail />
        </Box>
    )
}
