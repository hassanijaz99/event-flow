"use client"

import { useEffect, useState } from "react";

function useDarkMode() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? 'light'
  );


  useEffect(() => {
    if (theme === 'dark') {
      localStorage.setItem("theme", "dark")
      document.querySelector('html')?.classList.add('dark');
    } else {
      localStorage.setItem("theme", "light")
      document.querySelector('html')?.classList.remove('dark');
    }

    console.log({ themeInfo: "THEME WAS CHANGED", theme })
  }, [theme]);

  return { theme, setTheme };
}

export default useDarkMode;
