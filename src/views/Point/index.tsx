import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import useNavigation from '../../stores/navigation.store';
import { Navigation } from '../../constants/enum';

export default function Point() {

    const {setNavigation} = useNavigation()

    const onCloseButtonHandler = () => {
      setNavigation(Navigation.Order);
    }

    const savePoint = 0;

  return (
        <Box sx={{width:'35rem', height:'80vh'}}>
          <Box sx={{display:'flex', p:'1rem' ,justifyContent:'space-between', borderBottom:'1px solid #E6E8EB', alignItems:'center'}}>
              <Typography>포인트 적립/사용</Typography>
              <IconButton onClick={onCloseButtonHandler}>
                <CloseIcon />
              </IconButton>
          </Box>
          <Box sx={{display:'flex'}}>
                <Box sx={{flex:2}}>
                  <Box sx={{display:'flex'}}>
                    <Button sx={{flex:1, p: '10px'}}>적립</Button>
                    <Button sx={{flex:1}}>사용</Button>
                  </Box>
                  <TextField fullWidth label="전화번호" sx={{m: '10px'}}/>
                  <TextField inputProps={{readOnly: true}} defaultValue={savePoint} fullWidth label="적립포인트" sx={{m: '10px'}}/>
                  <Typography>보유: 20,000P</Typography>
                </Box>
          </Box>
        </Box>
  )
}
