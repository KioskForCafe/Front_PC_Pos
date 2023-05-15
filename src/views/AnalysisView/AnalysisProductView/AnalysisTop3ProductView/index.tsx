import { Box, Card, CardContent, Divider, Icon, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import React from 'react'

interface props {
    byMenu: {
        menuId: number,
        menuName: string,
        saleCount: number,
        totalPrice: number
    }[];
}
export default function AnalysisTop3ProductView({ byMenu }: props) {

    const sortedMenu = byMenu.sort((a, b) => b.saleCount - a.saleCount);
    
    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Typography sx={{ fontSize: '2vh', fontWeight: 600, color: 'red' }}>Top 1<Icon><LocalFireDepartmentIcon /></Icon></Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh' }}>{sortedMenu[0].menuName}</Typography>
                            <Typography>총 {byMenu.reduce((sum,menu) => sum + menu.saleCount,0)}건 주문 수 중 {sortedMenu[0].saleCount}건 주문</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '0px 20px' }}>
                        {sortedMenu.slice(1, 3).map((menu, index) => (
                            <Box sx={{ display: 'flex', p: '10px 0px' }} key={menu.menuId}>
                                <Typography sx={{ mr: '1vh', fontSize: '2vh' }}>{index + 2}</Typography>
                                <Typography sx={{ flex: 1, fontSize: '2vh' }}>{menu.menuName}</Typography>
                                <Typography sx={{ textAlign: 'right', fontSize: '2vh' }}>{menu.saleCount}건</Typography>
                            </Box>
                        ))}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
