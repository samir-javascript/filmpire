/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useMemo , useState  ,createContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';



export const ColorModeContext = createContext()

const ToggleColorMode = ({children})=> {
    const [mode,setMode] = useState('light')
    useEffect(() => {
      // Save the mode to localStorage whenever it changes
      localStorage.setItem('colorMode', mode);
    }, [mode]);
    const toggleMode = ()=> setMode((prevMode)=> prevMode === 'light' ? 'dark' : 'light')
     const theme = useMemo(()=> createTheme({
        palette: {
            mode
        }
     }), [mode]);
   return (
     <ColorModeContext.Provider value={{mode,setMode, toggleMode}}>
         <ThemeProvider theme={theme}>
              {children}
         </ThemeProvider>
     </ColorModeContext.Provider>
   )
}
export default ToggleColorMode;

