// src/components/ThemeSwitcher.tsx
import React, { useEffect, useState } from 'react';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-black dark:text-blue-200">
        {theme === 'light' ? 'Light' : 'Dark'}
      </span>
      <div
        className={`w-14 h-8 flex items-center bg-black dark:bg-gradient-to-r from-blue-500 to-indigo-900 rounded-full cursor-pointer transition-colors duration-300`}
        onClick={toggleTheme}
      >
        <div className="w-6 h-6 bg-white dark:bg-neutral-900 rounded-full shadow-md transform transition-transform duration-300 translate-x-1 dark:translate-x-7" />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
