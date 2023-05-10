import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'

interface  props{
    time: number,
    saleAmount: number,
    saleCount: number
}

export default function AnalysisBusinessDetail({time, saleAmount, saleCount}:props) {

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
                        <TableRow>
                            <TableCell>{time}</TableCell>
                            <TableCell>{saleAmount}</TableCell>
                            <TableCell align="right">{saleCount}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
