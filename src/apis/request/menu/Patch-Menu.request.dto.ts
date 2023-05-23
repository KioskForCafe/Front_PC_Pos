interface Option{
  optionId: number | null;
  optionName: string;
  optionPrice: number;
}

interface RequestDto {
  storeId: number;
  menuId: number;
  categoryId: number | null;
  menuName: string;
  menuPrice: number;
  menuState: boolean;
  menuImgUrl: string | null;
  optionList: Option[];
}

export default RequestDto;
