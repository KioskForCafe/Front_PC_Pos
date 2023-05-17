import React, { SyntheticEvent, useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, MenuItem, MenuList, MenuProps, Menu, Tab, Tabs, tabsClasses } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GetCategoryResponseDto } from '../../../apis/response/category';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../stores/user.store';
import User from '../../../interfaces/User.interface';
import { useCookies } from 'react-cookie';
import { GET_CATEGORY_LIST_URL, authorizationHeader } from '../../../constants/api';
import axios, { AxiosResponse } from 'axios';
import ResponseDto from '../../../apis/response';
import { useStoreStore } from '../../../stores';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



export default function CategoryBar() {

  const navigator = useNavigate();

  const [categoryResponse, setCategoryResponse] = useState<GetCategoryResponseDto[] | null>(null);
  const [categoryId, setCategoryId] = useState<string>('');

  const { user } = useStore();
  const { store } = useStoreStore();
  const [addUser, setAddUser] = useState<User | null>(null);

  const [cookies] = useCookies();

  const accessToken = cookies.accessToken;


  //         Event Handler          //
  const getCategory = (accessToken: string) => {
    if (!accessToken) {
      alert('로그인이 필요합니다.')
      return;
    }

    if(store?.storeId == null) {
      alert('존재하지 않는 점포입니다.')
      return;
    }

    axios.get(GET_CATEGORY_LIST_URL(store.storeId.toString()), authorizationHeader(accessToken))
      .then((response) => getCategoryResponseHandler(response))
      .catch((error) => getCategoryErrorHandler(error));
  }


  //              Response Handler                //

  const getCategoryResponseHandler = (response: AxiosResponse<any, any>) => {
    const { result, message, data } = response.data as ResponseDto<GetCategoryResponseDto[]>
    if (!result || !data) {
      alert(message);
      navigator('/');
      return;
    }
    setCategoryResponse(data);
  }



  //          Error Handler           //

  const getCategoryErrorHandler = (error: any) => {
    console.log(error.message);
  }


  //          Use Effect              //

  useEffect(() => {
    if (store?.storeId) getCategory(accessToken);
    console.log();
  }, [store?.storeId]);



  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const sortCategory = categoryResponse?.sort((a,b) => b.categoryId - a.categoryId);

  return (
    <Box sx={{ zIndex: 1, position: 'relative', bgcolor: '#ffffff', height: '5vh' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        {sortCategory?.map((category) => (
          <Box>
            <Tab label={category.categoryName} />
          </Box>
        ))}
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
        <IconButton sx={{ color: '#8c8c8c' }} onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>수정</MenuItem>
          <MenuItem onClick={handleClose} disableRipple>삭제</MenuItem>
        </StyledMenu>
      </Tabs>
    </Box>
  )
}
