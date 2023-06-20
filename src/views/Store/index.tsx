import React, { useEffect, useState } from 'react'

import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';

import StoreCard from '../../components/StoreCard';
import { GET_STORE_URL, authorizationHeader } from '../../constants/api';
import { GetStoreResponseDto } from '../../apis/response/store';
import ResponseDto from '../../apis/response';
import { useNavigationStore, useStoreStore } from '../../stores';
import { Navigation } from '../../constants/enum';

import { Box, SpeedDial, Tooltip} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


export default function Store() {

  //        Hook        //
  const {setNavigation} = useNavigationStore();
  const {resetStore} = useStoreStore();

  const [cookies] = useCookies();

  const [storeList, setStoreList] = useState<GetStoreResponseDto[] | null>(null);
    
  const accessToken = cookies.accessToken;


  //          Event Handler          //
  const getStore = (accessToken: string) =>{
    axios
      .get(GET_STORE_URL, authorizationHeader(accessToken))
      .then((response)=>getStoreResponseHandler(response))
      .catch((error)=> getStoreErrorHandler(error));
  }

  //          Response Handler          //
  const getStoreResponseHandler = (response: AxiosResponse<any, any>) =>{
    const {data, message, result} = response.data as ResponseDto<GetStoreResponseDto[]>
    if(!result || data === null) return;
    setStoreList(data);
  }

  //          Error Handler          //
  const getStoreErrorHandler = (error: any) =>{
    console.log(error.message);
  }

  //          use Effect          //
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
