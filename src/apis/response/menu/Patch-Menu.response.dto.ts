interface Dto {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuImgUrl: string;
  menuState: boolean;
  storeId: number;
  categoryId: number;
  optionList: [
    {
      optionId: number;
      optionName: string;
      optionPrice: number;
    }
  ];
}

export default Dto;
