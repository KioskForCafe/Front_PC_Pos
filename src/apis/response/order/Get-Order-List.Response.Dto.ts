interface Dto {
    orderId: number,
    userId: string,
    createAt: Date,
    totalPrice: number,
    orderDetailList: [
        {
            menuName: string,
            count: number,
            optionList: string[]
        }
    ]
  }
  export default Dto;