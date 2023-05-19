import { create } from "zustand";
import MenuDetail from "../interfaces/Menu-Detail.interface";

interface IMenuDetailListStore {
    menuDetailList: MenuDetail[];
    setMenuDetailList: (menuDetailList: MenuDetail[]) => void;
    resetMenuDetailList: () => void;
}

const useMenuDetailList = create<IMenuDetailListStore>((set) => ({
    menuDetailList: [],
    setMenuDetailList: (menuDetailList: MenuDetail[]) => set((state) => ({ ...state, menuDetailList })),
    resetMenuDetailList: () => set((state) => ({ ...state, menuDetailList: [] })),
}));

export default useMenuDetailList;