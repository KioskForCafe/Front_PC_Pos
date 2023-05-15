import { AppBar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
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
                <TableContainer component={Table}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >매출액</TableCell>
                                <TableCell align="right">건수</TableCell>
                                <TableCell align="right">건당 평균 매출액</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{saleAmount}</TableCell>
                                <TableCell align="right">{saleCount}</TableCell>
                                <TableCell align="right">{avgSaleAmount}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
