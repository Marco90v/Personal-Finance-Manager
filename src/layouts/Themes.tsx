import { useEffect } from 'react';
// import useTheme from '@/store/useTheme';
import { useShallow } from 'zustand/react/shallow';
// import { useAutoTheme } from '@/hooks/useAutoTheme';
import usePreference from '@/stores/usePreference';
import { useAutoTheme } from '@/hooks/useAutoTheme';

function Themes({ children }: { children: React.ReactNode }) {
  const {initTheme} = usePreference(useShallow((s)=>({initTheme: s.initTheme})));
  useAutoTheme(); // detecta automáticamente si cambia el tema del sistema

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return <>{children}</>;
}

export default Themes;