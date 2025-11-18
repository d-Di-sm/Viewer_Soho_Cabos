import { createContext, useContext, useState } from "react";

const CharacterCustomizationContext = createContext({})

export const CameraModes = {
    'BASE': 'BASE',
    'AEREA': 'AEREA',
    'AMENIDADES': 'AMENIDADES',
    'RESIDENCIAS': 'RESIDENCIAS',
    'CASONA01': 'CASONA01',
    'CASONA02': 'CASONA02'
}


export const CharacterCustomizationProvider = ({children}) => {

    const [cameraMode, setCameraMode] = useState(CameraModes.BASE)
    const [isFloatingPanelActive, setIsFloatingPanelActive] = useState(false)
    
    const [tipologyResidencias, setTipologyResidencias] = useState([])

    //Function to check if an annotation should be visible 
    const isAnnotationVisible = (annotationName) => {
        if (cameraMode === CameraModes.BASE || cameraMode === CameraModes.AEREA) {
            return true
        }
        return cameraMode === annotationName
    }

    return (
        <CharacterCustomizationContext.Provider
            value= {{
                cameraMode,
                setCameraMode,

                isFloatingPanelActive,
                setIsFloatingPanelActive,

                isAnnotationVisible,

                tipologyResidencias,
                setTipologyResidencias,

            }}>
                {children}
            </CharacterCustomizationContext.Provider>
    )
}

export const useCharacterCustomization = () => {
    return useContext(CharacterCustomizationContext)
}



