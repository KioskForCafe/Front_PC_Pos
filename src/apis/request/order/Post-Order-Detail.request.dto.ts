interface RequestDto {
  menuId: number;
  menuCount: number;
  orderId: number;
  optionList: [
    {
      optionId: number;
      optionName: string;
      optionPrice: number;
    }
  ];
}
export default RequestDto;
