interface Dto {
  byCategory: [
    {
      categoryId: number;
      categoryName: string;
      saleCount: number;
      totalPrice: number;
    }
  ];
  byMenu: [
    {
      menuId: number;
      menuName: string;
      saleCount: number;
      totalPrice: number;
    }
  ];
}

export default Dto;
