export const userEmailValidator = /^[A-Za-z0-9]*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z0-9]{2,3}$/;
export const passwordValidator = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!?_]).{8,20}$/;
export const userIdValidator = /^[a-z0-9_-]{4,20}$/;
export const telNumberValidator = /^\d{3}-\d{3,4}-\d{4}$/;
export const userNameValidator = /^[a-zA-Z가-힣]{4,20}\s+$/