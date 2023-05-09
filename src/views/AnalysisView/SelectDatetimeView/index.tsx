import { Box } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { useNow } from '@mui/x-date-pickers/internals';

export default function SelectDatetimeView() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row' , justifyItems: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '500px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['StaticDatePicker']}>
            <DemoItem label={'시작일'}>
              <StaticDatePicker defaultValue={dayjs('useNow')} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box sx={{ width: '500px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['StaticDatePicker']}>
            <DemoItem label={'마감일'}>
              <StaticDatePicker defaultValue={dayjs('useNow')} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </Box>
  )
}
