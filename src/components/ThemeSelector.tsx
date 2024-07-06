import { useEffect, useState } from "react";
import SunIcon from "./Icons/Sun";
import MoonIcon from "./Icons/Moon";

const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

export default function ThemeSelector() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  });

  const changeTheme = () => {
    if (theme === THEMES.DARK) {
      setTheme(THEMES.LIGHT);
    } else {
      setTheme(THEMES.DARK);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === THEMES.LIGHT) {
      root.classList.remove(THEMES.DARK);
      localStorage.setItem("theme", THEMES.LIGHT);
    } else {
      root.classList.add(THEMES.DARK);
      localStorage.setItem("theme", THEMES.DARK);
    }
  });

  return (
    <div className="absolute right-5 top-5">
      <button
        onClick={changeTheme}
        className="w-max mx-auto bg-[#805ad5] dark:bg-[#fbd38d] p-2 rounded-xl text-white dark:text-black"
      >
        {theme === THEMES.DARK ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
