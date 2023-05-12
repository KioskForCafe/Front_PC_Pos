import { create } from "zustand";
import Store from "../interfaces/Store.interface";

interface IStoreStore {
    store: Store | null;
    setStore: (store: Store) => void;
    resetStore: () => void;
}

const useStore = create<IStoreStore>((set) => ({
    store: null,
    setStore: (store: Store) => set((state) => ({ ...state, store })),
    resetStore: () => set((state) => ({ ...state, store: null })),
}));

export default useStore;