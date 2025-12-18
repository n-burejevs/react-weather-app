import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(1);
    // classname = current.is_day == '0' ? "night-theme" : "day-theme"
    /*
  useEffect(() => {
   
  }, []);*/

  return (
    <ThemeContext.Provider
      value={{
        theme, 
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};