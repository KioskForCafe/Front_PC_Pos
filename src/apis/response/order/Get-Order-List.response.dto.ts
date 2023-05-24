import { OrderState } from "../../../constants/enum";

interface Dto {
    orderId: number,
    totalPrice: number,
    orderState: string,
    updatedAt: Date
  }
export default Dto;