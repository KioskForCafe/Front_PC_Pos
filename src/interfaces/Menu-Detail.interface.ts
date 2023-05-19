interface MenuDetail {
    menuId: number;
    menuName : string;
    menuCount: number;
    menuPrice: number;
    optionList: Option[];
}

interface Option {
    optionId: number;
    optionName: string;
    optionPrice: number;
}

export default MenuDetail;