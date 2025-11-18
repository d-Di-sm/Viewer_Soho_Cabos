
import { useState } from "react"
import { CameraModes, useCharacterCustomization } from "../contexts/CustomizationContext"
import { Affix, Button } from "@mantine/core"


import ResidenciasConfigurator from "./Configurators/ResidenciasConfigurator"


const Interface = () => {

    const {cameraMode, setCameraMode} = useCharacterCustomization()
    const [hoveredButton, setHoveredButton] = useState(null)

    const logos = ['L01.png', 'L02.png', 'L03.png', 'L04.png', 'L05.png', 'L06.png']

    return(
        <>
        <Affix position={{ bottom: 50, right: '50%'}} style={{transform: 'translateX(50%)'}}>
            <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50px',
                    padding: '30px',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    position: 'relative'
            }}>
                {Object.keys(CameraModes).map((mode, index) => {
                    const isActive = mode === cameraMode

                    return(
                        <Button
                            key={mode}
                            size='lg'
                            onClick={() => setCameraMode(mode)}
                            onMouseEnter={() => setHoveredButton(mode)}
                            onMouseLeave={() => setHoveredButton(null)}
                            styles={{
                                root:{
                                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.5' : 'transparent',
                                    borderRadius: '8px',
                                    width: '130px',
                                    height: '70px',
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                                        transform: 'scale(1.1)',
                                    }
                                },
                            }}
                        >
                            <img
                                src={`/logos/${logos[index]}`}
                                alt={`Logo ${index + 1}` }
                                style={{
                                    width: '60px',
                                    height: 'auto',
                                    borderRadius: '4px',
                                    objectFit: 'cover'
                                }}
                            />
                        </Button>
                    )
                }
                )}
            </div>

            {/* Tooltip */}
            {hoveredButton && (
                <div style={{
                        position: 'absolute',
                        bottom: '155px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'transparent',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '25px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        zIndex: 1000
                }}>
                    {hoveredButton}
                </div>
            )}

        </Affix>

        <Affix>
            {cameraMode === CameraModes.RESIDENCIAS && <ResidenciasConfigurator />}
        </Affix>

        </>
    )
}


export default Interface


