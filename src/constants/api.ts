const HOST = 'http://localhost:4040/';

export const authorizationHeader = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } };
}

export const mutipartHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' } };
}

export const DUPLICATE_USER_ID_URL = `${HOST}api/user/duplicate/checkId`;
export const DUPLICATE_USER_EMAIL_URL = `${HOST}api/user/duplicate/checkEmail`;
export const SIGN_UP_URL = `${HOST}auth/sign-up`;
export const SIGN_IN_URL = `${HOST}auth/sign-in`;

export const GET_STORE_URL = `${HOST}api/store`;


export const GET_MENU_DETAIL_URL = (menuId:number) => `${HOST}api/menu/${menuId}`;

export const POST_ORDER_DETAIL_URL = `${HOST}api/order-detail`;
export const POST_STORE_URL = `${HOST}api/store`;

export const GET_SALE_ANALYSIS_URL = (storeId: string, startedAt: string, endedAt: string) => `${HOST}api/analysis/sales/${storeId}/${startedAt}/${endedAt}`;
export const GET_ANALYSIS_BUSINESS_URL = (storeId: string, startedAt: string, endedAt: string) =>`${HOST}api/analysis/business/${storeId}/${startedAt}/${endedAt}`;
export const GET_ANALYSIS_MENU_URL = (storeId: string, startedAt: string, endedAt: string) =>`${HOST}api/analysis/menu/${storeId}/${startedAt}/${endedAt}`;
export const GET_MENU_LIST_URL = (storeId: string, categoryId: string) => `${HOST}api/menu/list/${storeId}/${categoryId}`;
export const GET_CATEGORY_LIST_URL = (storeId: string) => `${HOST}api/category/list/${storeId}`;
export const GET_ORDER_LOG_LIST_URL = (storeId: string) => `${HOST}api/order/list/${storeId}`;
export const GET_ORDER_DETAIL_LIST_URL = (orderId: string) => `${HOST}api/order/${orderId}`;

export const PATCH_STORE_URL = `${HOST}api/store`;

export const DELETE_STORE_URL = (storeId: string) => `${HOST}api/store/${storeId}`;

export const FILE_UPLOAD_URL = `${HOST}file/upload`;

