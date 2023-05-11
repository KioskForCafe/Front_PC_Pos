import { Box } from '@mui/material'
import { LocalizationProvider, StaticDatePicker, DatePicker } from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { useNow } from '@mui/x-date-pickers/internals';

export interface SelectDatetimeProps {
  startedAt: Dayjs;
  endedAt: Dayjs;
  onDatetimeChange: (startedAt: Dayjs, endedAt: Dayjs) => void;
}


export default function SelectDatetimeView(props: SelectDatetimeProps) {

  const { startedAt, endedAt, onDatetimeChange } = props;

  const handleStartedAtChange = (newValue: Dayjs | null) => {
    onDatetimeChange(newValue as Dayjs, endedAt);
  };

  const handleEndedAtChange = (newValue: Dayjs | null) => {
    onDatetimeChange(startedAt, newValue as Dayjs);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '500px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker label="시작일"
              value={startedAt}
              onChange={(newValue) => handleStartedAtChange(newValue)} />
            <DatePicker
              label="마감일"
              value={endedAt}
              onChange={(newValue) => handleEndedAtChange(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </Box>
  )
}
