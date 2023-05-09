import { Box, Divider } from '@mui/material'
import React from 'react'
import AnalysisCategoryBar from './AnalysisCategoryBar'
import SaleAnalysisView from './SaleAnalysisView'
import AnalysisBusinessView from './AnalysisBusinessView'
import AnalysisProductView from './AnalysisProductView'
import AnalysisCustomerView from './AnalysisCustomerView'

export default function AnalysisView() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '88vh', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%'}}>
        <Box sx={{width: '35vh'}}>
          <AnalysisCategoryBar />
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box sx={{ flex: 1 }}>
          {/* <SaleAnalysisView /> */}
          {/* <AnalysisBusinessView /> */}
          {/* <AnalysisProductView /> */}
          <AnalysisCustomerView/>
        </Box>
      </Box>
    </Box>
  )
}
