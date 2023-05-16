import { create } from "zustand";
import Menu from "../interfaces/menu.interface";

interface IMenuStore {
    menu: Menu | null;
    setMenu: (menu: Menu) => void;
    resetMenu: () => void;
}

const useMenu = create<IMenuStore>((set) => ({
    menu: null,
    setMenu: (menu: Menu) => set((state) => ({ ...state, menu })),
    resetMenu: () => set((state) => ({ ...state, menu: null })),
}));

export default useMenu;