import { Box, Card, CardContent, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'

interface props {
    saleListBytime: {
        time: number,
        saleAmount: number,
        saleCount: number
    }[]
}


export default function AnalysisBusinessDetail({ saleListBytime }: props) {

    const sortedBySaleCount = saleListBytime.sort((a, b) => b.saleCount - a.saleCount);

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >주문이 많이 들어온 시간대</Typography>
                            <Typography sx={{ fontSize: '4vh', mt: '1vh', mb: '1vh' }}>{sortedBySaleCount[0].time} : 00</Typography>
                            <Typography >{sortedBySaleCount[0].saleCount}건</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '2vh' }}>
                            <Typography >주문이 적게 들어온 시간대</Typography>
                            <Typography sx={{ fontSize: '4vh', mt: '1vh', mb: '1vh' }}>{sortedBySaleCount[sortedBySaleCount.length - 1].time} : 00</Typography>
                            <Typography>
                                {sortedBySaleCount[sortedBySaleCount.length - 1].saleCount}건</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Typography sx={{ ml: '3vh', mb: '3vh', fontSize: '2vh', fontWeight: 550, color: '#00208c' }}>시간별 결제 금액</Typography>
            <TableContainer component={Table}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                시간
                            </TableCell>
                            <TableCell align="right">
                                매출액
                            </TableCell>
                            <TableCell align="right">
                                건수
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {saleListBytime.map((sale) => (
                            <TableRow>
                                <TableCell>{sale.time}</TableCell>
                                <TableCell>{sale.saleAmount}</TableCell>
                                <TableCell align="right">{sale.saleCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
