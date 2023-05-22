import { create } from "zustand";
import OrderDetailList from "../interfaces/OrderDetailList.interface";


interface IOrderDetailListStore {
    orderDetailList: OrderDetailList[];
    setOrderDetailList: (orderDetailList: OrderDetailList[]) => void;
    resetOrderDetailList: () => void;
}

const useOrderDetailList = create<IOrderDetailListStore>((set) => ({
    orderDetailList: [],
    setOrderDetailList: (orderDetailList: OrderDetailList[]) => set((state) => ({ ...state, orderDetailList })),
    resetOrderDetailList: () => set((state) => ({ ...state, orderDetailList: [] })),
}));

export default useOrderDetailList;