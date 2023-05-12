import { Box, SpeedDial, Tooltip} from '@mui/material'
import React from 'react'

import AddIcon from '@mui/icons-material/Add';
import StoreCard from '../../components/StoreCard';

export default function Store() {
  
  return (
    <Box sx={{display:'flex', height:'88vh'}}>
      <Box sx={{flex:1, p:'1rem', display:'flex', flexDirection:'column'}}>
        <Box sx={{display:'flex', height:'50%'}}>
          <StoreCard/>
        </Box>
        <Box sx={{display:'flex', height:'50%'}}></Box>
        <Tooltip placement="top" title="매장 추가 하기">
          <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{ position: 'fixed', bottom:'7vh', right:'3vh'}}
            icon={<AddIcon/>}
          />
        </Tooltip>
          


      </Box>
    </Box>
  )
}
