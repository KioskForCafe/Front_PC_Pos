interface Option{
    optionId: number;
    optionName: string;
    optionPrice: number;
}
interface OrderDetailList {
    menuId: number;
    menuCount : number;
    menuName: string;
    menuPrice: number;
    optionList: Option[];
}

export default OrderDetailList;