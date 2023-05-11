import { Box, Typography } from '@mui/material'
import React from 'react'
import SelectDatetimeView from '../../SelectDatetimeView'
import AnalysisTop3ProductView from '../AnalysisTop3ProductView'
import AnalysisCategoryView from '../AnalysisCategoryView'
import AnalysisTop10ProductView from '../AnalysisTop10ProductView'
import { AnalysisMenuResponseDto } from '../../../../apis/response/analysis'

interface props {
  byCategory: AnalysisMenuResponseDto['byCategory'],
  byMenu: AnalysisMenuResponseDto['byMenu']
}

export default function AnalysisProductDetail({byCategory, byMenu}: props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ ml: '3vh', mb: '3vh', fontSize: '2vh', fontWeight: 550, color: '#00208c' }}>인기 상품</Typography>
      <Box sx={{ margin: '2vh', mb: '10vh' }}>
        <AnalysisTop3ProductView byMenu={byMenu} />
      </Box>
      <Typography sx={{ ml: '3vh', mb: '3vh', fontSize: '2vh', fontWeight: 550, color: '#00208c' }}>카테고리별 주문</Typography>
      <Box sx={{ margin: '2vh' }}>
        <AnalysisCategoryView byCategory={byCategory} />
      </Box>
      <Typography sx={{ ml: '3vh', mb: '3vh', fontSize: '2vh', fontWeight: 550, color: '#00208c' }}>Top 10 상품</Typography>
      <Box sx={{ margin: '2vh', mb: '10vh' }}>
        <AnalysisTop10ProductView byMenu={byMenu} />
      </Box>
    </Box>
  )
}
