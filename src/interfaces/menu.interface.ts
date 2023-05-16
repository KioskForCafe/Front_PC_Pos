interface Menu {
    menuId: number;
    menuName: string;
    menuPrice: number;
    menuImgUrl: string | null;
    menuState: boolean;
    categoryId: number;
    optionList: [
      {
        optionId: number;
        optionName: string;
        optionPrice: number;
      }
    ];
}

export default Menu;