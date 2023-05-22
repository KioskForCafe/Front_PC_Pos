import { PostOrderDetailRequestDto } from ".";

interface RequestDto {
  storeId: number;
  totalPrice: number;
  orderDetailList: PostOrderDetailRequestDto[];
  orderState: string;
}
export default RequestDto;
