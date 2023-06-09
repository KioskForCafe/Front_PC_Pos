const HOST = 'http://localhost:4040/';

export const authorizationHeader = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } };
}

export const mutipartHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' } };
}

export const DUPLICATE_USER_ID_URL = `${HOST}api/user/duplicate/checkId`;
export const DUPLICATE_USER_EMAIL_URL = `${HOST}api/user/duplicate/checkEmail`;
export const DUPLICATE_USER_TELNUMBER_URL = `${HOST}api/user/duplicate/checkTelNumber`;
export const SIGN_UP_URL = `${HOST}auth/sign-up`;
export const SIGN_IN_URL = `${HOST}auth/sign-in`;

export const GET_STORE_URL = `${HOST}api/store`;

export const GET_MENU_DETAIL_URL = (menuId:number) => `${HOST}api/menu/${menuId}`;
export const POST_MENU_URL = `${HOST}api/menu`;
export const PATCH_MENU_URL =`${HOST}api/menu`;
export const DELETE_MENU_URL = (menuId:number) =>`${HOST}api/menu/${menuId}`;

export const POST_CATEGORY_URL = `${HOST}api/category`;
export const PATCH_CATEGORY_URL = `${HOST}api/category`;
export const DELETE_CATEGORY_URL = (categoryId: number) => `${HOST}api/category/${categoryId}`;

export const POST_ORDER_DETAIL_URL = `${HOST}api/order-detail`;
export const POST_STORE_URL = `${HOST}api/store`;

export const POST_ORDER_URL =`${HOST}api/order`;
export const POST_ORDER_LOG_URL =`${HOST}api/order/log`;

export const POST_ALARM_URL = `${HOST}api/alarm`;

export const POST_SMS_URL = `${HOST}sms`;

export const GET_SALE_ANALYSIS_URL = (storeId: string, startedAt: string, endedAt: string) => `${HOST}api/analysis/sales/${storeId}/${startedAt}/${endedAt}`;
export const GET_ANALYSIS_BUSINESS_URL = (storeId: string, startedAt: string, endedAt: string) =>`${HOST}api/analysis/business/${storeId}/${startedAt}/${endedAt}`;
export const GET_ANALYSIS_MENU_URL = (storeId: string, startedAt: string, endedAt: string) =>`${HOST}api/analysis/menu/${storeId}/${startedAt}/${endedAt}`;
export const GET_MENU_LIST_URL = (storeId: string, categoryId: string) => `${HOST}api/menu/list/${storeId}/${categoryId}`;
export const GET_CATEGORY_LIST_URL = (storeId: string) => `${HOST}api/category/list/${storeId}`;
export const GET_ORDER_DETAIL_LIST_URL = (orderId: string) =>  `${HOST}api/order/${orderId}`;
export const GET_ORDER_LOG_LIST_URL = (storeId: string, orderState: string) => `${HOST}api/order/list/${storeId}/${orderState}`;
export const GET_ORDER_LIST_URL = (orderId: string) => `${HOST}api/order/${orderId}`;
export const GET_ORDER_STATE_COUNT = (storeId: string) => `${HOST}api/order/count/${storeId}`;
export const GET_USER_ANALYSIS_URL = (storeId: string, startedAt: string, endedAt: string) => `${HOST}api/analysis/user/${storeId}/${startedAt}/${endedAt}`
export const GET_ALARM_LIST = (storeId: string) => `${HOST}api/alarm/list/${storeId}`;

export const PATCH_STORE_URL = `${HOST}api/store`;

export const DELETE_STORE_URL = (storeId: string) => `${HOST}api/store/${storeId}`;
export const DELETE_ORDER_DETAIL_URL = (orderDetailId: string) => `${HOST}api/order/detail/${orderDetailId}`;

export const FILE_UPLOAD_URL = `${HOST}file/upload`;

export const PATCH_ORDER_URL = `${HOST}api/order`;
