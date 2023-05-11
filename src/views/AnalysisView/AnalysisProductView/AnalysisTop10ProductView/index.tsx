import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface props {
    byMenu : {
        menuId: number,
        menuName: string,
        saleCount: number,
        totalPrice: number
    }[]
}

export default function AnalysisTop10ProductView( {byMenu} : props ) {

    function createData(
        rank: number,
        menu: string,
        saleCount: number,
        saleAmount: number,
    ) {
        return { rank, menu, saleAmount, saleCount };
    }
    
    const rows = [
        createData(1, '시그니처', 10, 200000),
        createData(2, '아메리카노', 7, 200000),
        createData(3, '카페라떼', 3, 200000),
        createData(4, '자몽에이드', 2, 200000),
        createData(5, '아인슈페너', 1, 200000),
        createData(6, '밀크티', 1, 200000),
        createData(7, '캐모마일', 1, 200000),
        createData(8, '헤이즐넛라떼', 1, 200000),
        createData(9, '말차라떼', 1, 200000),
        createData(10, '옥수수라떼', 0, 200000),
    ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <TableContainer component={Table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>
                        순위
                    </TableCell>
                    <TableCell >
                        메뉴
                    </TableCell>
                    <TableCell align="right">
                        건수
                    </TableCell>
                    <TableCell align="right">
                        매출액
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={`${row.rank}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.rank}
                        </TableCell>
                        <TableCell>
                            {row.menu}
                        </TableCell>
                        <TableCell align="right">{row.saleCount}</TableCell>
                        <TableCell align="right">{row.saleAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Box>
  )
}
