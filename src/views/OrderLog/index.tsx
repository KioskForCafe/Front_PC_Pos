import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function OrderLog() {
    return (
    <Box sx={{display:'flex', flexDirection:'column',height:'88vh'}}>
        <Box sx={{display:'flex', border:'1px solid #FFFFFF', height:'3.5rem', alignItems: 'center'}}>
            <Box sx={{flex:1, textAlign:'center', color: 'grey'}}>대기</Box>
            <Box sx={{flex:1, textAlign:'center', color: 'grey'}}>접수</Box>
            <Box sx={{flex:1, textAlign:'center', color: 'grey'}}>완료</Box>
        </Box>
        
        <Box sx={{p:'10px', backgroundColor: '#E6E8EB' ,flex:1}}>
            <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'white', width:'15rem', height:'20rem', borderRadius:'1rem'}}>
                <Box sx={{p:'10px', display:'flex', flex:0.5}}>
                    <Typography sx={{flex:1}}>접수번호</Typography>
                    <Typography sx={{flex:1,textAlign:'end'}}>접수시간</Typography>
                </Box>
                <Box sx={{px:'10px', flex:3, flexDirection:'column'}}>
                    <Box sx={{display:'flex'}}>
                        <Box sx={{display:'flex', flexDirection:'column', flex:3}}>
                            <Typography>메뉴 이름</Typography>
                            <Typography>ㄴ 선택옵션</Typography>
                        </Box>
                        <Typography sx={{flex:1}}>수량</Typography>
                    </Box>
                </Box>
                <Box sx={{p:'10px', position:'relative', bottom:'0', flex:0.5, borderTop:'2px solid #f1f3f4', borderRadius:'0 0 1rem 1rem'}}>
                    <Typography>2품목</Typography>
                </Box>
            </Box>
        </Box>
        <Box sx={{px: '1rem',height:'3.5rem', display:'flex', alignItems:'center'}}>
            <IconButton sx={{mx:'5px'}}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton sx={{mx:'5px'}}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>
    </Box>
    );
}

export default OrderLog;