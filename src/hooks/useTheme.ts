import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Inicializar el tema
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setThemeState(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    setMounted(true);

    // Escuchar cambios en el tema del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Escuchar cambios de tema desde otras instancias
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_KEY) {
        const newTheme = e.newValue as Theme;
        setThemeState(newTheme || 'light');
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Escuchar eventos personalizados para sincronización en la misma ventana
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setThemeState(e.detail);
      document.documentElement.classList.toggle('dark', e.detail === 'dark');
    };
    window.addEventListener('themeChange' as any, handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange' as any, handleThemeChange);
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Disparar evento personalizado para sincronización en la misma ventana
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
    
    // Disparar evento de storage para sincronización entre pestañas
    window.dispatchEvent(new Event('storage'));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme, mounted };
}
