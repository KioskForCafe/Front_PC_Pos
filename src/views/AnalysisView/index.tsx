import { Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import AnalysisCategoryBar from './AnalysisCategoryBar'
import SaleAnalysisView from './SaleAnalysisView'
import AnalysisBusinessView from './AnalysisBusinessView'
import AnalysisProductView from './AnalysisProductView'
import AnalysisCustomerView from './AnalysisCustomerView'

export default function AnalysisView() {

  const [node, setNode] = useState<string>('SaleAnalysisView');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '88vh', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '35vh' }}>
          <AnalysisCategoryBar setNode={setNode} />
        </Box>
        <Divider orientation='vertical' />
        <Box sx={{ flex: 1 }}>
          {
            node === "SaleAnalysisView" ? <SaleAnalysisView /> :
              node === "AnalysisBusinessView" ? <AnalysisBusinessView /> :
                node === "AnalysisProductView" ? <AnalysisProductView /> :
                  node === "AnalysisCustomerView" && <AnalysisCustomerView />
          }
        </Box>
      </Box>
    </Box>
  )
}
