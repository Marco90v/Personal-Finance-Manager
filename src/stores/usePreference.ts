import { devtools, persist } from "zustand/middleware"

import { create } from "zustand"
// import type { Theme } from "@/types"

type State = {
  currency: "USD",
  theme: 'light' | 'dark' | 'system',
}

type Action = {
  setPreference: (preference: State) => void;
  initTheme: () => void;
}

const usePreference = create<State & Action>()(devtools(
  persist(
    (set, get)=>({
      currency: "USD",
      theme: 'system',
      setPreference: (preference) => {
        // localStorage.setItem('theme', theme);
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        const resolvedTheme =
          preference.theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : preference.theme;

        root.classList.add(resolvedTheme);
        // set({ theme, actualTheme: resolvedTheme });
        set({ ...preference })
      },
      initTheme: () => {
        // const saved = (localStorage.getItem('theme') as Theme) || 'system';
        const { theme, currency } = get();
        get().setPreference({theme, currency})
      },
    }),
    {
      name:"usePreference"
    }
  )
))

export default usePreference