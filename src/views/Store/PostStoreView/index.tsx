import { Box, Fab, IconButton, Input, Typography } from '@mui/material'
import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { PostStoreResponseDto } from '../../../apis/response/store';
import axios, { AxiosResponse } from 'axios';
import { PostStoreRequestDto } from '../../../apis/request/store';
import ResponseDto from '../../../apis/response';
import { FILE_UPLOAD_URL, POST_STORE_URL, authorizationHeader, mutipartHeader } from '../../../constants/api';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useNavigate } from 'react-router-dom';
import { useNavigationStore } from '../../../stores';
import { Navigation } from '../../../constants/enum';

export default function PostStoreView() {

    const {setNavigation} = useNavigationStore();

    const navigator = useNavigate();

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    const StoreImageRef = useRef<HTMLInputElement | null>(null);
    const LogoImageRef = useRef<HTMLInputElement | null>(null);

    const [postStore, setPostStore] = useState<PostStoreResponseDto | null>(null);
    const [storeCloseTime, setStoreCloseTime] = useState<string>('');
    const [storeImgUrl, setStoreImgUrl] = useState<string>('');
    const [storeLogoUrl, setStoreLogoUrl] = useState<string>('');
    const [storeName, setStoreName] = useState<string>('');
    const [storeOpenTime, setStoreOpenTime] = useState<string>('');


    //          Event Handler          //


    const onPostStore = () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }
        const data: PostStoreRequestDto = {
            storeCloseTime: parseInt(storeCloseTime),
            storeImgUrl,
            storeLogoUrl,
            storeName,
            storeOpenTime: parseInt(storeOpenTime)
        };

        axios.post(POST_STORE_URL, data, authorizationHeader(accessToken))
            .then((response) => postStoreResponseHandler(response))
            .catch((error) => postStoreErrorHandler(error));
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


    const onStoreImageUploadButtonHandler = () => {
        if (!StoreImageRef.current) return;
        StoreImageRef.current.click();
    }

    const onLogoImageUploadButtonHandler = () => {
        if(!LogoImageRef.current) return;
        LogoImageRef.current.click();
    }

    const onWriteHandler = () => {
        if (!storeName.trim() || !storeOpenTime.trim() || !storeCloseTime.trim()) {
            alert('모든 내용을 입력해주세요.');
            return;
        }
        onPostStore();
        setNavigation(Navigation.Store);
    }




    //          Response Handler          //

    const postStoreResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PostStoreResponseDto>;
        if (!result || !data) {
            alert(message);
            return;
        }
        setPostStore(data);
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

    const postStoreErrorHandler = (error: any) => {
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
        if (!accessToken) {
            alert('로그인이 필요한 작업입니다.');
            navigator('/auth');
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', height: '88vh', justifyContent:'center', alignItems:'center', overflow:'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography variant='h4' marginBottom='10px' >매장 등록</Typography>
                <Typography sx={{ mt: '2vh', ml: '2vh', display: 'flex', fontSize: '2vh' }}>매장 이름</Typography>
                <Input sx={{ ml: '2vh', display: 'flex' }} placeholder={storeName} onChange={(event) => setStoreName(event.target.value)} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>오픈 시간</Typography>
                <Input sx={{ ml: '2vh', display: 'flex' }} placeholder={storeOpenTime} onChange={(event) => setStoreOpenTime(event.target.value)} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>마감 시간</Typography>
                <Input sx={{ ml: '2vh', display: 'flex' }} placeholder={storeCloseTime} onChange={(event) => setStoreCloseTime(event.target.value)} />
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>
                    매장 이미지
                    <IconButton onClick={() => onStoreImageUploadButtonHandler()}>
                        <ImageOutlinedIcon />
                        <input ref={StoreImageRef} hidden type='file' accept='image/*' onChange={(event) => storeImageUploadChangeHandler(event)} />
                    </IconButton>
                </Typography>
                <Box sx={{ width: '300px' }} component='img' src={storeImgUrl} width='100%'/>
                <Typography sx={{ ml: '2vh', display: 'flex', fontSize: '2vh' }}>매장 로고 이미지
                    <IconButton sx={{ flex: 1 }} onClick={() => onLogoImageUploadButtonHandler()}>
                        <ImageOutlinedIcon />
                        <input ref={LogoImageRef} hidden type='file' accept='image/*' onChange={(event) => storeLogoUploadChangeHandler(event)} />
                    </IconButton>
                </Typography>
                <Box sx={{ width: '200px' }} component='img' src={storeLogoUrl}  width='100%'/>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ flex: 1 }} onClick={() => setNavigation(Navigation.Store)}>
                        <Typography>뒤로가기</Typography>
                    </IconButton>
                    <IconButton sx={{ flex: 1 }} onClick={onWriteHandler}>
                        <Typography>등록</Typography>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
