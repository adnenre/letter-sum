import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // For toggling dark mode
  const handleThemeSwitch = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <button
      onClick={handleThemeSwitch}
      className="flex items-center p-2 rounded-full border-2 border-gray-500 dark:border-gray-300"
    >
      {isDarkMode ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-gray-300" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
