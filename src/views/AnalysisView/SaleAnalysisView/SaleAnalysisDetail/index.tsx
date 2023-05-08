import { AppBar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import React from 'react'

function createData(
    date: string,
    saleAmount: number,
    saleCount: number,
    avgSaleAmount: number,
) {
    return { date, saleAmount, saleCount, avgSaleAmount };
}

const rows = [
    createData('2023. 05. 20', 2000000, 200, 10000),
    createData('2023. 05. 20', 2000000, 200, 10000),
    createData('2023. 05. 20', 2000000, 200, 10000),
    createData('2023. 05. 20', 2000000, 200, 10000),
];

export default function SaleAnalysisDetail() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <TableContainer component={Table}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>날짜</TableCell>
                                <TableCell align="right">매출액</TableCell>
                                <TableCell align="right">건수</TableCell>
                                <TableCell align="right">건당 평균 매출액</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.date}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="right">{row.saleAmount}</TableCell>
                                    <TableCell align="right">{row.saleCount}</TableCell>
                                    <TableCell align="right">{row.avgSaleAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
