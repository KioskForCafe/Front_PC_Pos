interface Dto {
  totalVisitedUserCount: number;
  newVisitedUserCount: number;
  userTop10List: [
    {
      userId: string;
      userName: string;
      telNumber: string;
      visitedCount: number;
      point: number;
      amountPayment: number;
    }
  ];
}
export default Dto;
