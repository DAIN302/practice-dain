import { createContext, useState } from "react";

export const VillagerContext = createContext('light');

export function VillagerProvider ({children}){
    const [theme, setTheme] = useState('light')

    const chgTheme = (mode) => {
        setTheme(mode);
    }
        
    return (
        <VillagerContext.Provider value={{theme, chgTheme}}>
            {children}
        </VillagerContext.Provider>
    )
}