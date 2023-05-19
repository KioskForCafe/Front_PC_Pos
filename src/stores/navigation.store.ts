import { create } from "zustand";
import { Navigation } from "../constants/navigationEnum";

interface INavigationStore {
    navigation: Navigation;
    setNavigation: (navigation: Navigation) => void;
    resetNavigation: () => void;
}

const useNavigation = create<INavigationStore>((set) => ({
    navigation: Navigation.AuthenticationView,
    setNavigation: (navigation: Navigation) => set((state) => ({ ...state, navigation })),
    resetNavigation: () => set((state) => ({ ...state, navigation: Navigation.AuthenticationView })),
}));

export default useNavigation;