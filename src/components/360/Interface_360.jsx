import { Affix, Button } from "@mantine/core"
import { useState } from "react"
import { TourModes, useTourCustomization } from "../../contexts/CustomizationContextTour.jsx"



const Interface360 = ({ onReturnClick }) => {

    const { tourMode, setTourMode } = useTourCustomization()
    const [hoveredButton, setHoveredButton] = useState(null)

    const logos = ['L01.png', 'L02.png', 'L03.png']

    const handleButtonClick = (mode) => {
        if (mode === 'RETURN' && onReturnClick) {
            onReturnClick()
        } else {
            setTourMode(mode)
        }
    }

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
                {Object.keys(TourModes).map((mode, index) => {
                    const isActive = mode === tourMode

                    return(
                        <Button
                            key={mode}
                            size='lg'
                            onClick={() => handleButtonClick(mode)}
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

        {/* <Affix>
            {tourMode === TourModes.INFO && <TourInformation />}
        </Affix> */}
        
        
        </>
    )
}


export default Interface360


