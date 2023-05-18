export const userIdValidator = /^[a-z0-9_-]{4,20}$/;
export const passwordValidator = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!?_]).{8,}$/;
export const userNameValidator = /^[a-zA-Z가-힣]{2,120}\S+$/
export const userEmailValidator = /^[A-Za-z0-9]*@[A-Za-z0-9]([-.]?[A-Za-z0-9])*\.[A-Za-z0-9]{2,3}$/;
export const telNumberValidator = /^\d{3}-\d{3,4}-\d{4}$/;