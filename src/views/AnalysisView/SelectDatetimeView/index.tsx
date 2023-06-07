import { Box, Button } from '@mui/material'
import { LocalizationProvider, StaticDatePicker, DatePicker } from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { useNow } from '@mui/x-date-pickers/internals';
import { useStoreStore } from '../../../stores';

export interface SelectDatetimeProps {
  startedAt: Dayjs;
  endedAt: Dayjs;
  onDatetimeChange: (startedAt: Dayjs, endedAt: Dayjs) => void;
}


export default function SelectDatetimeView(props: SelectDatetimeProps) {

  const { startedAt, endedAt, onDatetimeChange } = props;
  
  const { store } = useStoreStore();

  const handleDateTimeOnOpen = () => {
    if(store?.storeOpenTime == null) return;
    if(store.storeCloseTime == null) return;
    
    const openHour = store.storeOpenTime;
    const closeHour = store.storeCloseTime;
    const currentDate = dayjs();
    const openDateAndTime = currentDate.set('hour', openHour);
    const closeDateAndTime = currentDate.set('hour', closeHour);
    onDatetimeChange(openDateAndTime, closeDateAndTime);

}

const handleDateTimeMonth = () => {
    const startDate = dayjs();
    const oneMonthAgo = startDate.subtract(1, 'month');
    onDatetimeChange(oneMonthAgo, startDate);
}

const handleDateTimeWeek = () => {
    const startDate = dayjs();
    const oneWeekAgo = startDate.subtract(7, 'days');
    onDatetimeChange(oneWeekAgo, startDate);
}

const handleDateTimeThreeMonth = () => {
    const startDate = dayjs();
    const threeMonthAgo = startDate.subtract(3, 'months');
    onDatetimeChange(threeMonthAgo, startDate);
}

  const handleStartedAtChange = (newValue: Dayjs | null) => {
    onDatetimeChange(newValue as Dayjs, endedAt);
  };

  const handleEndedAtChange = (newValue: Dayjs | null) => {
    onDatetimeChange(startedAt, newValue as Dayjs);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>
      <Box>
        <Button onClick={handleDateTimeOnOpen}>영업중</Button>
        <Button onClick={handleDateTimeWeek}>1주</Button>
        <Button onClick={handleDateTimeMonth}>1개월</Button>
        <Button onClick={handleDateTimeThreeMonth}>3개월</Button>
      </Box>
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
