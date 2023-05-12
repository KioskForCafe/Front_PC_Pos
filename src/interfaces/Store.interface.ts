interface Store {
    storeId : number;
    storeName : string;
    storeOpenTime : number | null;
    storeCloseTime : number | null;
    storeImgUrl: string | null;
    storeLogoUrl: string | null;
}

export default Store;