import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function Point() {
    const [open, setOpen] = React.useState(false);
    const savePoint = 0;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <>
    <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{width:'35rem', height:'80vh'}}>
          <Box sx={{display:'flex', p:'1rem' ,justifyContent:'space-between', borderBottom:'1px solid #E6E8EB', alignItems:'center'}}>
              <Typography>포인트 적립/사용</Typography>
              <IconButton>
                <CloseIcon/>
              </IconButton>
          </Box>
          <Box sx={{display:'flex'}}>
            <Box sx={{flex:2}}>
              <Box sx={{display:'flex'}}>
                <Button sx={{flex:1}}>적립</Button>
                <Button sx={{flex:1}}>사용</Button>
              </Box>
              <TextField fullWidth label="전화번호"/>
              <TextField inputProps={{readOnly: true}} defaultValue={savePoint} fullWidth label="적립포인트"/>
              <Typography>보유: 20,000P</Typography>
            </Box>
            <Box sx={{flex:1}}>

            </Box>
          </Box>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>

        </Box>
        
      </Dialog>
  </>
  )
}
