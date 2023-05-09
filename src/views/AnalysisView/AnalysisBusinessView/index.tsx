import { Box } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import SaleAnalysisDetail from '../SaleAnalysisView/SaleAnalysisDetail';
import AnalysisBusinessDetail from './AnalysisBusinessDetail';
import SelectDatetimeView from '../SelectDatetimeView';

export default function AnalysisBusinessView() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
            <SelectDatetimeView />
            <AnalysisBusinessDetail />
        </Box>
    )
}
