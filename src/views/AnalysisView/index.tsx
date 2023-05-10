import { Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import AnalysisCategoryBar from './AnalysisCategoryBar'
import SaleAnalysisView from './SaleAnalysisView'
import AnalysisBusinessView from './AnalysisBusinessView'
import AnalysisProductView from './AnalysisProductView'
import AnalysisCustomerView from './AnalysisCustomerView'

export default function AnalysisView() {

  const [node, setNode] = useState<string>('SaleAnalysisView');
  const data: any= {
    "SaleAnalysisView" : <SaleAnalysisView />,
    "AnalysisBusinessView" : <AnalysisBusinessView/>,
    "AnalysisProductView" : <AnalysisProductView/>,
    "AnalysisCustomerView" : <AnalysisCustomerView/>
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '88vh', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
        <Box sx={{width: '35vh'}}>
          <AnalysisCategoryBar setNode={setNode} />
        </Box>
        <Divider orientation='vertical'/>
        <Box sx={{ flex: 1 }}>
          {/* {data['SaleAnalysisView']} */}
          {data[node]}
          {/* <SaleAnalysisView /> */}
          {/* <AnalysisBusinessView /> */}
          {/* <AnalysisProductView /> */}
          {/* <AnalysisCustomerView/> */}
        </Box>
      </Box>
    </Box>
  )
}
