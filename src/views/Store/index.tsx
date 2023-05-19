import { Box, Button, SpeedDial, Tooltip} from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import StoreCard from '../../components/StoreCard';
import axios, { AxiosResponse } from 'axios';
import { GET_STORE_URL, authorizationHeader } from '../../constants/api';
import { useCookies } from 'react-cookie';
import { GetStoreResponseDto } from '../../apis/response/store';
import ResponseDto from '../../apis/response';
import PostStoreView from './PostStoreView';
import { useNavigationStore, useStoreStore } from '../../stores';
import { Navigation } from '../../constants/navigationEnum';


export default function Store() {

  const {setNavigation} = useNavigationStore();

  const {resetStore} = useStoreStore();

  const [cookies] = useCookies();

  const [storeList, setStoreList] = useState<GetStoreResponseDto[] | null>(null);
    
  const accessToken = cookies.accessToken;

  const getStore = (accessToken: string) =>{
    axios
      .get(GET_STORE_URL, authorizationHeader(accessToken))
      .then((response)=>getStoreResponseHandler(response))
      .catch((error)=> getStoreErrorHandler(error));
  }

  const getStoreResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data, message, result} = response.data as ResponseDto<GetStoreResponseDto[]>
    if(!result || data === null) return;
    console.log(storeList);
    setStoreList(data);
  }

  const getStoreErrorHandler = (error: any) =>{
    console.log(error.message);
  }
  useEffect(()=>{
    getStore(accessToken);
    resetStore();
  },[])

  return (
    <Box sx={{display:'flex', height:'88vh'}}>
      <Box sx={{flex:1, p:'1rem', display:'flex', flexDirection:'column'}}>
        <Box sx={{p:'5px', display:'flex', height:'50%'}}>
          {
            storeList !== null ? 
              storeList?.map((store) => (
                <StoreCard getStore={getStore} item={store}/> 
              ))
              : '매장을 등록하세요'
          }
        </Box>
        <Box sx={{display:'flex', height:'50%'}}></Box>
        <Tooltip placement="top" title="매장 추가 하기">
          <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{ position: 'fixed', bottom:'7vh', right:'3vh'}}
            icon={<AddIcon/>}
            onClick={()=>setNavigation(Navigation.PostStoreView)}
          />
        </Tooltip>
      </Box>
    </Box>
  )
}
