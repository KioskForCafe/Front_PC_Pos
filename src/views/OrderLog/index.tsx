import { Box, Typography } from '@mui/material';
import React from 'react';

function OrderLog() {
    return (
    <Box sx={{flex:1}}>
        <Box sx={{display:'flex', border:'1px solid #808080', height:'30px'}}>
            <Box sx={{flex:1, textAlign:'center', color: 'grey'}}>대기</Box>
            <Box sx={{flex:1, textAlign:'center', color: 'grey'}}>접수</Box>
            <Box sx={{flex:1, textAlign:'center', color: 'grey'}}>완료</Box>
        </Box>
        <Box sx={{p:'10px', backgroundColor: '#8f8f8f', height:'100%'}}>
            <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'white', p:'10px',width:'15rem', height:'20rem', border:'1px solid #000'}}>
                <Box sx={{display:'flex', flex:0.5}}>
                    <Typography sx={{flex:1}}>접수번호</Typography>
                    <Typography sx={{flex:1,textAlign:'end'}}>접수시간</Typography>
                </Box>
                <Box sx={{mt:'10px', flex:3, flexDirection:'column'}}>
                    <Box sx={{display:'flex'}}>
                        <Box sx={{display:'flex', flexDirection:'column', flex:3}}>
                            <Typography>메뉴 이름</Typography>
                            <Typography>ㄴ 선택옵션</Typography>
                        </Box>
                        <Typography sx={{flex:1}}>수량</Typography>
                    </Box>
                </Box>
                <Box sx={{position:'relative', bottom:'0', flex:0.5}}>
                    <Typography>2품목</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
    );
}

export default OrderLog;