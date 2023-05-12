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

    const sortedMenu = byMenu.sort((a, b) => b.saleCount - a.saleCount);

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
                {sortedMenu.map((menu, index) => (
                    <TableRow
                        key={`${menu.menuId}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell>
                            {menu.menuName}
                        </TableCell>
                        <TableCell align="right">{menu.saleCount}</TableCell>
                        <TableCell align="right">{menu.totalPrice}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Box>
  )
}
