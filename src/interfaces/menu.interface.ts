interface Menu {
    menuId: number;
    menuName: string;
    menuPrice: number;
    menuImgUrl: string;
    menuState: boolean;
    categoryId: number;
    optionList: 
      {
        optionId: number;
        optionName: string;
        optionPrice: number;
      }[];
}

export default Menu;