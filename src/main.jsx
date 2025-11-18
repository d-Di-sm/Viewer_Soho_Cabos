import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createTheme, MantineProvider } from '@mantine/core'
import { TourCustomizationProvider } from './contexts/CustomizationContextTour.jsx'
import { CharacterCustomizationProvider } from './contexts/CustomizationContext.jsx'
import Recorrido360 from './components/360/Recorrido360.jsx'


const theme = createTheme({
  /**
   * Put your mantine
   */
  components: {
    Button: {
      styles:{
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.4',
          color: 'black',
          '&:hover':{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          },
        },
      },
    },
  },
})



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <MantineProvider theme={theme}>
//       <CharacterCustomizationProvider>
//         <App />
//       </CharacterCustomizationProvider>
//     </MantineProvider>
//   </StrictMode>,
// )



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <CharacterCustomizationProvider >
        <TourCustomizationProvider>
            <App />
        </TourCustomizationProvider>
      </CharacterCustomizationProvider >
    </MantineProvider>
  </StrictMode>,

)