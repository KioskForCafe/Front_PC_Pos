import { Box, Card, CardContent, Divider, Icon, Typography } from '@mui/material'
import React from 'react'
import AnalysisTop10CustomerView from '../AnalysisTop10CustomerView'

export default function AnalysisCustomerDetail() {
    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >총 고객</Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>500명</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >신규 고객</Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>10명</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >회원 평균 방문 수</Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>10번</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                    </Box>
                </CardContent>
            </Card>
            <Box sx={{p: '1vh'}}>
                <AnalysisTop10CustomerView />
            </Box>
        </Box>
    )
}
