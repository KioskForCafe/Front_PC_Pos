import { Box, Divider } from '@mui/material'
import React from 'react'
import AnalysisCategoryBar from './AnalysisCategoryBar'
import SaleAnalysisView from './SaleAnalysisView'

export default function AnalysisView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Box sx={{width: '35vh'}}>
          <AnalysisCategoryBar />
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box sx={{ flexGrow: 1 }}>
          <SaleAnalysisView />
        </Box>
      </Box>
    </Box>
  )
}
