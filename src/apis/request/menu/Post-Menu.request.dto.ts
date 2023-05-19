interface OptionDto{
  optionName : string;
  optionPrice : number;
}
interface RequestDto {
  storeId: number;
  categoryId : number | null;
  menuName : string;
  menuPrice : number;
  menuState: boolean;
  menuImgUrl : string | null;
  optionList : OptionDto[];
}

export default RequestDto;
