import { OrderState } from "../../../constants/enum";

interface Dto {
    orderId: number,
    totalPrice: number,
    orderState: OrderState,
    updatedAt: Date
  }
export default Dto;