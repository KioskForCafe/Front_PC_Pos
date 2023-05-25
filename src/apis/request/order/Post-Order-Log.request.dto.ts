interface OptionList {
    optionId: number;
    optionName: string;
    optionPrice: number;
}

interface OrderDetail {
    menuId : number;
    menuName : string;
    menuPrice : number;
    categoryId : number;
    categoryName : string;
    optionList : OptionList[];
    priceWithOption : number;
    storeId : number;
    storeName : string;
    count : number;
}

interface RequestDto {
    userId: string;
    userName: string;
    telNumber: string | null;
    storeId: number;
    storeName: string;
    orderId: number;
    createdAt: Date;
    orderDetail: OrderDetail[];
}

export default RequestDto;
  