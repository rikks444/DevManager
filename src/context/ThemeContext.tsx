import { useState, createContext, useMemo } from "react"

type defaultContextType = {
    theme: string, 
    setTheme: (theme: string) => void;
}

const initialContextValue: defaultContextType = {
    theme: 'light',
    setTheme: () => {}
}

const ThemeContext = createContext(initialContextValue)

function ThemeContextProvider ({children}: any) {
    const [theme, setTheme] = useState("light")

    useMemo(() => {
        setTheme(localStorage.getItem("theme") || "light")
    }, [])

    function setThemeHandler(currentTheme: string){
        localStorage.setItem("theme", currentTheme)
        setTheme(currentTheme)
    }

    return <ThemeContext.Provider value={{theme, setTheme: setThemeHandler}}>
        {children}
    </ThemeContext.Provider>
}
export {ThemeContext, ThemeContextProvider}

