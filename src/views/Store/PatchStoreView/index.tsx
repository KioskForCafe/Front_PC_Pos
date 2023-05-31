import { Box, Typography, Input, IconButton, Fab } from '@mui/material'
import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { PatchStoreRequestDto, PostStoreRequestDto } from '../../../apis/request/store';
import ResponseDto from '../../../apis/response';
import { GetStoreResponseDto, PatchStoreResponseDto, PostStoreResponseDto } from '../../../apis/response/store';
import { POST_STORE_URL, authorizationHeader, FILE_UPLOAD_URL, mutipartHeader, PATCH_STORE_URL, GET_STORE_URL } from '../../../constants/api';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useNavigationStore, useStoreStore } from '../../../stores';
import { Navigation } from '../../../constants/enum';

export default function PatchStoreView() {

    const { setNavigation } = useNavigationStore();


    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    const StoreImageRef = useRef<HTMLInputElement | null>(null);
    const LogoImageRef = useRef<HTMLInputElement | null>(null);

    const { store, resetStore } = useStoreStore();

    const [storeList, setStoreList] = useState<GetStoreResponseDto[] | null>(null);
    const [storeCloseTime, setStoreCloseTime] = useState<string>(store && store.storeCloseTime ? store.storeCloseTime+'' : '');
    const [storeImgUrl, setStoreImgUrl] = useState<string>(store && store.storeImgUrl ? store.storeImgUrl : '');
    const [storeLogoUrl, setStoreLogoUrl] = useState<string>(store && store.storeLogoUrl ? store.storeLogoUrl : '');
    const [storeName, setStoreName] = useState<string>(store && store.storeName ? store.storeName : '');
    const [storeOpenTime, setStoreOpenTime] = useState<string>(store && store.storeOpenTime ? store.storeOpenTime+'' : '');


    //          Event Handler          //

    const getStore = (accessToken: string) => {
        axios
            .get(GET_STORE_URL, authorizationHeader(accessToken))
            .then((response) => getStoreResponseHandler(response))
            .catch((error) => getStoreErrorHandler(error));
    }

    const onPatchStore = (accessToken: string) => {
        const data: PatchStoreRequestDto = {
            storeId: parseInt(store?.storeId + ''),
            storeCloseTime: parseInt(storeCloseTime),
            storeImgUrl,
            storeLogoUrl,
            storeName,
            storeOpenTime: parseInt(storeOpenTime)
        };

        axios.patch(PATCH_STORE_URL, data, authorizationHeader(accessToken))
            .then((response) => patchStoreResponseHandler(response))
            .catch((error) => patchStoreErrorHandler(error));
    }

    const storeImageUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);

        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => storeImageUploadResponseHandler(response))
            .catch((error) => storeImageUplloadErrorHandler(error));
    }

    const storeLogoUploadChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = new FormData();
        data.append('file', event.target.files[0]);

        axios.post(FILE_UPLOAD_URL, data, mutipartHeader())
            .then((response) => storeLogoUploadResponseHandler(response))
            .catch((error) => storeLogoUploadErrorHandler(error));
    }

    const onUpdateButtonHandler = () => {
        if (!storeName.trim() || !storeOpenTime.trim() || !storeCloseTime.trim()) {
            alert('모든 내용을 입력해주세요.');
            return;
        }
        onPatchStore(accessToken);
    }


    const onStoreImageUploadButtonHandler = () => {
        if (!StoreImageRef.current) return;
        StoreImageRef.current.click();
    }

    const onLogoImageUploadButtonHandler = () => {
        if(!LogoImageRef.current) return;
        LogoImageRef.current.click();
    }

    //          Response Handler          //

    const getStoreResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetStoreResponseDto[]>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setStoreList(data);
        if (storeImgUrl) setStoreImgUrl(storeImgUrl);
        if (storeLogoUrl) setStoreLogoUrl(storeLogoUrl);
    }

    const patchStoreResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PatchStoreResponseDto>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setNavigation(Navigation.Store);
        
    }

    const storeImageUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if (!imageUrl) return;
        setStoreImgUrl(imageUrl);
    }

    const storeLogoUploadResponseHandler = (response: AxiosResponse<any, any>) => {
        const imageUrl = response.data as string;
        if (!imageUrl) return;
        setStoreLogoUrl(imageUrl);
    }

    //          Error Handler          //

    const getStoreErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const patchStoreErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const storeImageUplloadErrorHandler = (error: any) => {
        console.log(error.message);
    }

    const storeLogoUploadErrorHandler = (error: any) => {
        console.log(error.message);
    }

    //          Use Effect          //
    useEffect(() => {
        if (store?.storeId == null) {
            return;
        }
        //? 현재 로그인되어 있는지 검증
        if (!accessToken) {
            return;
        }
        getStore(accessToken);
    }, []);

    return (
        <Box sx={{ display: 'flex', height: '88vh', justifyContent:'center', alignItems:'center', overflow:'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography variant='h4' marginBottom='10px' >매장 수정</Typography>
                <Typography sx={{ mt: '2vh', ml: '2vh', display: 'flex', fontSize: '2vh' }}>점포명</Typography>
                <Input sx={{ ml: '2vh', display: 'flex' }} value={storeName} onChange={(event) => setStoreName(event.target.value)} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>오픈 시간</Typography>
                <Input sx={{ ml: '2vh', display: 'flex' }} value={storeOpenTime} onChange={(event) => setStoreOpenTime(event.target.value)} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>마감 시간</Typography>
                <Input sx={{ ml: '2vh', display: 'flex' }} value={storeCloseTime} onChange={(event) => setStoreCloseTime(event.target.value)} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>
                    점포 이미지
                    <IconButton onClick={() => onStoreImageUploadButtonHandler()}>
                        <ImageOutlinedIcon />
                        <input ref={StoreImageRef} hidden type='file' accept='image/*' onChange={(event) => storeImageUploadChangeHandler(event)} />
                    </IconButton>
                </Typography>
                <Box sx={{ width: '30%' }} component='img' src={storeImgUrl} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>점포 로고 이미지
                    <IconButton onClick={() => onLogoImageUploadButtonHandler()}>
                        <ImageOutlinedIcon />
                        <input ref={LogoImageRef} hidden type='file' accept='image/*' onChange={(event) => storeLogoUploadChangeHandler(event)} />
                    </IconButton>
                </Typography>
                <Box sx={{ width: '10%' }} component='img' src={storeLogoUrl} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ flex: 1 }} onClick={() => {setNavigation(Navigation.Store); resetStore();}}>
                        <Typography>뒤로가기</Typography>
                    </IconButton>
                    <IconButton sx={{ flex: 1 }} onClick={onUpdateButtonHandler}>
                        <Typography>수정</Typography>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
