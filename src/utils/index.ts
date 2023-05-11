//? 쿠기 만료 시점 계산
export const getExpires =(expiredTime : number)=>{
    const now = new Date().getTime();
    return new Date(now + expiredTime);
}