import { AppBar, Box, Button, Card, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Toolbar, Typography, Divider } from '@mui/material'
import React from 'react'

interface props {
    saleAmount: number,
    saleCount: number,
    avgSaleAmount: number
}

export default function SaleAnalysisDetail({ saleAmount, saleCount, avgSaleAmount }: props) {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Card sx={{ minWidth: 650, p: '2vh' }}>
                    <Box sx={{ display: 'flex', width: '100%', height: '5vh', alignItems: 'center' }}>
                        <Typography sx={{ flex: 1 }}>매출액</Typography>
                        <Divider orientation='vertical' />
                        <Typography sx={{ flex: 1, ml: '2vh' }}>결제 건수</Typography>
                        <Divider orientation='vertical' />
                        <Typography sx={{ flex: 1, ml: '2vh' }}>건당 평균 매출액</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', height: '10vh', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '40px', color: '#00208c' }}>{saleAmount}</Typography>
                            <Typography sx={{ fontSize: '25px', color: '#000000' }}>원</Typography>
                        </Box>
                        <Divider orientation='vertical' />
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', ml: '2vh' }}>
                            <Typography sx={{ fontSize: '40px', color: '#00208c' }}>{saleCount}</Typography>
                            <Typography sx={{ fontSize: '25px', color: '#000000' }}>건</Typography>
                        </Box>
                        <Divider orientation='vertical' />
                        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', ml: '2vh' }}>
                            <Typography sx={{ fontSize: '40px', color: '#00208c' }}>{avgSaleAmount}</Typography>
                            <Typography sx={{ fontSize: '25px', color: '#000000' }}>원</Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}
