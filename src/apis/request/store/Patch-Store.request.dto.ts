interface RequestDto {
  storeId: number;
  storeName: string;
  storeOpenTime: number | null;
  storeCloseTime: number | null;
  storeLogoUrl: string | null;
  storeImgUrl: string | null;
}
export default RequestDto;
