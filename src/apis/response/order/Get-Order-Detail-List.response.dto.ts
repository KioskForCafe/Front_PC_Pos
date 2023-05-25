interface OptionList {
    optionId: number;
    optionName: string;
    optionPrice: number;
}
interface Dto {
    menuId: number;
    menuName: string;
    menuPrice: number;
    categoryId: number;
    categoryName: string;
    priceWithOption: number;
    count: number;
    optionList: OptionList[]
}
export default Dto;