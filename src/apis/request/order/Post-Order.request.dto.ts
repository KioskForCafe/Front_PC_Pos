import { PostOrderDetailRequestDto } from ".";

interface RequestDto {
  storeId: number;
  totalPrice: number;
  orderDetailList: PostOrderDetailRequestDto[]
}
export default RequestDto;
