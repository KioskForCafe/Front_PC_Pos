import { create } from "zustand";
import Category from "../interfaces/Category.interface";

interface ICategoryListStore {
    categoryList: Category[];
    setCategoryList: (categoryList: Category[]) => void;
    resetCategoryList: () => void;
}

const useCategoryList = create<ICategoryListStore>((set) => ({
    categoryList: [],
    setCategoryList: (categoryList: Category[]) => set((state) => ({ ...state, categoryList })),
    resetCategoryList: () => set((state) => ({ ...state, categoryList: [] })),
}));

export default useCategoryList;