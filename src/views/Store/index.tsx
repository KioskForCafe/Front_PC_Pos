import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, SpeedDial, SpeedDialAction, SpeedDialIcon, Tooltip, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

export default function Store() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false);
  const storeMenuOpen = Boolean(anchorEl);
  const handleStoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStoreMenuClose = () => {
    setAnchorEl(null);
  };

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  const handleSpeedDialOpen = () => setSpeedDialOpen(true);
  const handleSpeedDialClose = () => setSpeedDialOpen(false);

  return (
    <Box sx={{display:'flex', height:'88vh'}}>
      <Box sx={{flex:1, p:'1rem', display:'flex'}}>
        <Card sx={{ maxWidth: 300, height:'40vh' }}>
          <CardHeader
            action={
              <IconButton onClick={handleStoreMenuClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title="매장명"
            subheader="등록일"
          />
          <CardMedia
            component="img"
            sx={{height:'20vh'}}
            src=""
            // image='C:/Users/ghtjd/Desktop/workspace/team-project/front-project/src/static/images/noImage.jpg'
            // image="./static/images/noImage.jpg"
            alt="이미지"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              영업시간 : 매장 오픈 시간 ~ 마감 시간
            </Typography>
          </CardContent>
        </Card>
        <Tooltip placement="top" title="매장 추가 하기">
          <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: 'fixed', bottom:'7vh', right:'3vh'}}
          icon={<AddIcon/>}/>
        </Tooltip>
          

        <Menu 
          anchorEl={anchorEl}
          open={storeMenuOpen}
          onClose={handleStoreMenuClose}
          onClick={handleStoreMenuClose} 
        >
          <MenuItem onClick={handleStoreMenuClose}>수정</MenuItem>
          <MenuItem onClick={handleStoreMenuClose}>삭제</MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
