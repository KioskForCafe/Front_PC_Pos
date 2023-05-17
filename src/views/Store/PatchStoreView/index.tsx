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
import { useStoreStore } from '../../../stores';

interface Props {
    setNode: Dispatch<React.SetStateAction<string>>;
}

export default function PatchStoreView({ setNode }: Props) {

    const navigator = useNavigate();

    const [cookies] = useCookies();

    const accessToken = cookies.accessToken;

    const imageRef = useRef<HTMLInputElement | null>(null);

    const { store } = useStoreStore();

    const [storeList, setStoreList] = useState<GetStoreResponseDto[] | null>(null);
    const [storeCloseTime, setStoreCloseTime] = useState<string>('');
    const [storeImgUrl, setStoreImgUrl] = useState<string>('');
    const [storeLogoUrl, setStoreLogoUrl] = useState<string>('');
    const [storeName, setStoreName] = useState<string>('');
    const [storeOpenTime, setStoreOpenTime] = useState<string>('');


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
        setNode('Store');
    }

    const onStoreNameChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setStoreName(value);
    }

    const onImageUploadButtonHandler = () => {
        if (!imageRef.current) return;
        imageRef.current.click();
    }

    //          Response Handler          //

    const getStoreResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetStoreResponseDto[]>;
        if (!result || !data) {
            alert(message);
            navigator('/');
            return;
        }
        setStoreList(data);
    }

    const patchStoreResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<PatchStoreResponseDto>;
        if (!result || !data) {
            alert(message);
            return;
        }
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
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Box>
                <Typography>점포명</Typography>
                <Input placeholder={storeName} onChange={(event) => setStoreName(event.target.value)} />
                <Typography>오픈 시간</Typography>
                <Input placeholder={storeOpenTime} onChange={(event) => setStoreOpenTime(event.target.value)} />
                <Typography>마감 시간</Typography>
                <Input placeholder={storeCloseTime} onChange={(event) => setStoreCloseTime(event.target.value)} />
                <Typography>점포 이미지</Typography>
                <IconButton onClick={() => onImageUploadButtonHandler()}>
                    <ImageOutlinedIcon />
                    <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => storeImageUploadChangeHandler(event)} />
                </IconButton>
                <Box sx={{ width: '100%' }} component='img' src={storeImgUrl} />
                <Typography>점포 로고 이미지</Typography>
                <IconButton onClick={() => onImageUploadButtonHandler()}>
                    <ImageOutlinedIcon />
                    <input ref={imageRef} hidden type='file' accept='image/*' onChange={(event) => storeLogoUploadChangeHandler(event)} />
                </IconButton>
                <Box sx={{ width: '100%' }} component='img' src={storeLogoUrl} />
            </Box>
            <IconButton onClick={() => setNode('Store')}>
                <Typography>뒤로가기</Typography>
            </IconButton>
            <Fab sx={{ position: 'fixed', bottom: '200px', right: '248px', backgroundColor: '#999999' }} onClick={onUpdateButtonHandler}>
                <AddBusinessIcon />
            </Fab>
        </Box>
    )
}
