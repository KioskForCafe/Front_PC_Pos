import OrderDetailList from "../interfaces/OrderDetailList.interface";

//? 쿠기 만료 시점 계산
export const getExpires =(expiredTime : number)=>{
    const now = new Date().getTime();
    return new Date(now + expiredTime);
}

export const getTotalPrice = (orderDetailList: OrderDetailList[]) => {
    let totalPrice = 0;
    orderDetailList.map((orderDetail)=>{
        let singlePrice = 0;
        singlePrice += orderDetail.menuPrice;
        orderDetail.optionList.map((option)=>{
            singlePrice += option.optionPrice;
        })
        totalPrice += singlePrice * orderDetail.menuCount;
    })
    return totalPrice;
}