import { Backdrop, Box, Grid, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios, { AxiosResponse } from 'axios';
import { GET_MENU_LIST_URL, authorizationHeader } from '../../../constants/api';
import { useCategoryStore, useNavigationStore, useStoreStore } from '../../../stores';
import ResponseDto from '../../../apis/response';
import { GetMenuResponseDto } from '../../../apis/response/menu';
import MenuCard from '../../../components/MenuCard';
import { useCookies } from 'react-cookie';
import { Navigation } from '../../../constants/navigationEnum';

interface Props {
    setMenuDetailView: Dispatch<React.SetStateAction<boolean>>
}

export default function OrderContent({setMenuDetailView}:Props) {

    const {setNavigation} = useNavigationStore();

    const {store} = useStoreStore();
    const {category} = useCategoryStore();
    const [menuList, setMenuList] = useState<GetMenuResponseDto[] | null>(null);

    const [cookies] = useCookies();

    const [speedDialOpen, setSpeedDialOpen] = useState<boolean>(false);

    const onAddCategoryButtonHandler = () =>{
        setSpeedDialOpen(false);
        setNavigation(Navigation.PostCategory);
    }   

    const onAddMenuButtonHandler = () =>{
        setSpeedDialOpen(false);
        setNavigation(Navigation.PostMenu);
    }

    const accessToken = cookies.accessToken;

    const getMenuList = (accessToken: string) =>{
        if(category !== null){
            axios
                .get(GET_MENU_LIST_URL(store?.storeId+'', category?.categoryId+''),authorizationHeader(accessToken))
                .then((response)=>getMenuListResponseHandler(response))
                .catch((error)=>getMenuListErrorHandler(error))
        }
    }

    const getMenuListResponseHandler = (response: AxiosResponse<any, any>) =>{
      const {data,message,result} = response.data as ResponseDto<GetMenuResponseDto[]>
      if(!result){
        console.log(message);
        return;
      }
      setMenuList(data);
    }

    const getMenuListErrorHandler = (error: any) =>{
      console.log(error.message);
    }

    useEffect(()=>{
        getMenuList(accessToken);
    },[category])

  return (
    <Box sx={{flex:1, position:'relative' ,display:'flex', overflow:'auto', flexDirection:'column', backgroundColor:'#E6E8EB'}}>
        <Typography sx={{p:'1rem'}}>총 {menuList?.length}개</Typography>
        <Box sx={{flex:1, px:'1rem'}}>
            <Grid container rowSpacing={3} columnSpacing={1}>
                {
                    menuList !==null && 
                    menuList.map((menu)=>(
                        <MenuCard setMenuDetailView={setMenuDetailView} menu={menu}/>
                    ))
                }
                
            </Grid>
        </Box>
        <Box sx={{px: '1rem',height:'4rem', display:'flex', alignItems:'center'}}>
            <IconButton sx={{mx:'5px'}}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <IconButton sx={{mx:'5px'}}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>

        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={()=>setSpeedDialOpen(false)}
            onOpen={()=>setSpeedDialOpen(true)}
            open={speedDialOpen}
        >
            <Backdrop  open={speedDialOpen} />
            <SpeedDialAction
                sx={{width:'100px', height: '50px', borderRadius:1}}
                icon='카테고리 추가'
                onClick={onAddCategoryButtonHandler}
            />
            <SpeedDialAction
                sx={{width:'100px', height: '50px', borderRadius:1}}
                icon='메뉴 추가'
                onClick={onAddMenuButtonHandler}
            />
        </SpeedDial>
    </Box>
  )
}
