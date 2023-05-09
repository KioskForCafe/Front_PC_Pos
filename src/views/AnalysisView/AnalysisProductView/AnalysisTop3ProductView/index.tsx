import { Box, Card, CardContent, Divider, Icon, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import React from 'react'

export default function AnalysisTop3ProductView() {
    return (
        <Box sx={{width: '100%'}}>
            <Card sx={{ boxShadow: 'none'}}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Typography sx={{ fontSize: '2vh', fontWeight: 600, color: 'red' }}>Top 1<Icon><LocalFireDepartmentIcon /></Icon></Typography>
                            <Typography sx={{ fontSize: '4vh', mb: '2vh'}}>메뉴명</Typography>
                            <Typography>총 30건 주문 수 중 10건 주문</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: '0px 20px'}}>
                            <Box sx={{ display: 'flex', p: '10px 0px' }}>
                                <Typography sx={{ mr: '1vh', fontSize: '2vh'}}>2</Typography>
                                <Typography sx={{flex: 1, fontSize: '2vh'}}>메뉴명</Typography>
                                <Typography sx={{textAlign: 'right', fontSize: '2vh'}}>7건</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', p: '10px 0px' }}>
                                <Typography sx={{ mr: '1vh', fontSize: '2vh' }}>3</Typography>
                                <Typography sx={{ flex: 1, fontSize: '2vh' }}>메뉴명</Typography>
                                <Typography sx={{ textAlign: 'right', fontSize: '2vh' }}>3건</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
