// import useTheme from '@/store/useTheme';
import usePreference from '@/stores/usePreference';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export function useAutoTheme() {
  const preference = usePreference(useShallow((s)=>({
    theme: s.theme,
    currency: s.currency,
    setPreference: s.setPreference
  })));

  useEffect(() => {
    if (preference.theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      preference.setPreference({...preference, theme: 'system'}); // ya resuelve internamente light/dark
    };

    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [preference]);
}