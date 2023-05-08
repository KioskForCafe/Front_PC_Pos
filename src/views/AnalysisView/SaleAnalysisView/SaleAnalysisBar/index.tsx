import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function SaleAnalysisBar() {
    return (
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', height: '7vh', flexDirection: 'row'}}>
                <Toolbar sx={{display: 'flex', flex: 1, bgcolor: '#ffffff'}}>
                    <Button sx={{flex: 1 , justifyContent: 'flex-start'}}>
                        <Typography sx={{color: '#000000'}}>매출액</Typography>
                    </Button >
                    <Button sx={{flex: 1, justifyContent: 'flex-start'}}>
                        <Typography sx={{color: '#000000'}}>건수</Typography>
                    </Button>
                    <Button sx={{flex: 1, justifyContent: 'flex-start'}}>
                        <Typography sx={{color: '#000000'}}>건당 평균 매출액</Typography>
                    </Button>
                </Toolbar>
        </Box>
    )
}
