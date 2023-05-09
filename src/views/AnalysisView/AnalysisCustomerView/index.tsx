import { Box, Typography } from '@mui/material'
import React from 'react'
import SelectDatetimeView from '../SelectDatetimeView'
import AnalysisCustomerDetail from './AnalysisCustomerDetail'

export default function AnalysisCustomerView() {
    return (
        <Box>
            <Typography align='left' sx={{fontSize: '3vh', p: '3vh' }}>고객 분석</Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SelectDatetimeView />
                <AnalysisCustomerDetail />
            </Box>
        </Box>

    )
}
