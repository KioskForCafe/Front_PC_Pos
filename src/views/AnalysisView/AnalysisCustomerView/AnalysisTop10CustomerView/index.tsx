import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface UserTop10List {
    userId: string,
    userName: string,
    telNumber: string,
    visitedCount: number,
    point: number,
    amountPayment: number
}

interface props {
    userTop10List: UserTop10List[];
}
export default function AnalysisTop10CustomerView({ userTop10List }: props) {


    let sorted = userTop10List.sort((a, b) => b.amountPayment - a.amountPayment);
    const [sortedUser, setSortedUser] = useState<UserTop10List[]>(sorted);

    useEffect(() => {
        sorted = userTop10List.sort((a, b) => b.amountPayment - a.amountPayment);
        setSortedUser(sorted);
    }, [userTop10List])

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
                        {sortedUser.map((user, index) => (
                            <TableRow
                                key={`${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell>
                                    {user.userName}
                                </TableCell>
                                <TableCell>{user.telNumber}</TableCell>
                                <TableCell align="right">{user.visitedCount}</TableCell>
                                <TableCell align="right">{user.amountPayment}</TableCell>
                                <TableCell align="right">{user.point}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
