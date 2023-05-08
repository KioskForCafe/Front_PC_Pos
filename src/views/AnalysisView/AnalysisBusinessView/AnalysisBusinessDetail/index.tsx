import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'

function createData(
    date: string,
    time: number,
    saleAmount: number,
    saleCount: number,
    avgSaleAmount: number,
) {
    return { date, time, saleAmount, saleCount, avgSaleAmount };
}

const rows = [
    createData('2023. 05. 20', 9, 2000000, 200, 10000),
    createData('2023. 05. 20', 10, 2000000, 200, 10000),
    createData('2023. 05. 20', 11, 2000000, 200, 10000),
    createData('2023. 05. 20', 12, 2000000, 200, 10000),
];

export default function AnalysisBusinessDetail() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <TableContainer component={Table}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                날짜
                            </TableCell>
                            <TableCell >
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
                        {rows.map((row) => (
                            <TableRow
                                key={`${row.date}-${row.time}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.time}
                                </TableCell>
                                <TableCell align="right">{row.saleAmount}</TableCell>
                                <TableCell align="right">{row.saleCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
