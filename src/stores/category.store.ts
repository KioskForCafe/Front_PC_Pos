import { create } from "zustand";
import Category from "../interfaces/Category.interface";

interface ICategoryStore {
    category: Category | null;
    setCategory: (category: Category) => void;
    resetCategory: () => void;
}

const useCategory = create<ICategoryStore>((set) => ({
    category: null,
    setCategory: (category: Category) => set((state) => ({ ...state, category })),
    resetCategory: () => set((state) => ({ ...state, category: null })),
}));

export default useCategory;