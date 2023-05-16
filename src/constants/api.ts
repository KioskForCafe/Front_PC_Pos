const HOST = 'http://localhost:4040/';

export const authorizationHeader = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } };
}

export const DUPLICATE_USER_ID_URL = `${HOST}api/user/checkId/duplicate`;
export const DUPLICATE_USER_EMAIL_URL = `${HOST}api/user/checkEmail/duplicate`;
export const SIGN_UP_URL = `${HOST}auth/sign-up`;
export const SIGN_IN_URL = `${HOST}auth/sign-in`;

export const GET_STORE_URL = `${HOST}api/store`;

export const GET_CATEGORY_LIST_URL = (storeId: number) => `${HOST}api/category/list/${storeId}`;

export const GET_MENU_LIST_URL = (storeId: number, categoryId: number) => `${HOST}api/menu/list/${storeId}/${categoryId}`;
export const GET_MENU_DETAIL_URL = (menuId:number) => `${HOST}api/menu/${menuId}`;

export const POST_ORDER_DETAIL_URL = `${HOST}api/order-detail`;

export const GET_SALE_ANALYSIS_URL = (storeId: string, startedAt: string, endedAt: string) => `${HOST}api/analysis/sales/${storeId}/${startedAt}/${endedAt}`;
export const GET_ANALYSIS_BUSINESS_URL = (storeId: string, startedAt: string, endedAt: string) =>`${HOST}api/analysis/business/${storeId}/${startedAt}/${endedAt}`;
export const GET_ANALYSIS_MENU_URL = (storeId: string, startedAt: string, endedAt: string) =>`${HOST}api/analysis/menu/${storeId}/${startedAt}/${endedAt}`;

