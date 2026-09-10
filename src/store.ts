import { create } from "zustand";
interface IIsDark {
  isDark: boolean;
  toggleDark: () => void;
}
export const useIsDarkStore = create<IIsDark>((set, get) => {
  return {
    isDark: false,
    toggleDark: () => {
      const { isDark } = get();
      set({ isDark: !isDark });
    },
  };
});
export function useIsDark() {
  const isDark = useIsDarkStore((state) => state.isDark);
  const toggleDark = useIsDarkStore((state) => state.toggleDark);
  return { isDark, toggleDark };
}
