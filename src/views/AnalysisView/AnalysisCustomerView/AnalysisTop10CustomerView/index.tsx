import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function AnalysisTop10CustomerView() {

    function createData(
        rank: number,
        name: string,
        telNumber: string,
        visitedCount: number,
        saleAmount: number,
        point: number
    ) {
        return { rank, name, telNumber, visitedCount, saleAmount, point };
    }
    
    const rows = [
        createData(1, '홍길동', '010-0000-0000', 20, 200000, 3000 ),
        createData(2, '김철수', '010-0000-0000', 20, 200000, 3000),
        createData(3, '이영희', '010-0000-0000', 20, 200000, 3000),
        createData(4, '박민호', '010-0000-0000', 20, 200000, 3000),
        createData(5, '신사임당', '010-0000-0000', 20, 200000, 3000),
        createData(6, '권율', '010-0000-0000', 20, 200000, 3000),
        createData(7, '김길동', '010-0000-0000', 20, 200000, 3000),
        createData(8, '이민수', '010-0000-0000', 20, 200000, 3000),
        createData(9, '최민희', '010-0000-0000', 20, 200000, 3000),
        createData(10, '이은정', '010-0000-0000', 20, 200000, 3000),
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
                        이름
                    </TableCell>
                    <TableCell >
                        전화번호
                    </TableCell>
                    <TableCell align="right">
                        방문수
                    </TableCell>
                    <TableCell align="right">
                        매출액
                    </TableCell>
                    <TableCell align="right">
                        포인트
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
                            {row.name}
                        </TableCell>
                        <TableCell>{row.telNumber}</TableCell>
                        <TableCell align="right">{row.visitedCount}</TableCell>
                        <TableCell align="right">{row.saleAmount}</TableCell>
                        <TableCell align="right">{row.point}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Box>
  )
}
