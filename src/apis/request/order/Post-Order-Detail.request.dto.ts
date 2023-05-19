interface RequestDto {
  menuId: number;
  menuCount: number;
  optionList: [
    {
      optionId: number;
      optionName: string;
      optionPrice: number;
    }
  ] | null;
}
export default RequestDto;
