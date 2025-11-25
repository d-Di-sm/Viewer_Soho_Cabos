import { useEffect, useState } from 'react'
import './Overlay.css'
import { CameraModes, useCharacterCustomization } from '../contexts/CustomizationContext'
import { Button } from '@mantine/core'


const objectMappings = {
    '2BR_G': {image: './floorplans/Res_G.png', title: 'Two Bedrooms Garden: 140.00 M2'},
    '2BR': {image: './floorplans/Res_T.png', title: 'Two Bedrooms: 120.00 M2'},
    '3BR_G': {image: './floorplans/Res_G.png', title: 'Three Bedrooms Garden: 160.00 M2'},
    '3BR': {image: './floorplans/Res_T.png', title: 'Three Bedrooms: 140.00 M2'},
    '4BR_T': {image: './floorplans/R_4BR_R.png', title: 'Penthouse Roof: 200.00 M2'},
    '4BR': {image: './floorplans/R_4BR.png', title: 'Penthouse: 200.00 M2'}
}




const Overlay = ({ onTourClick }) => {

    const [showFloatingPanel, setShowFloatingPanel] = useState(false)
    const [showModalPanel, setShowModalPanel] = useState(false)
    const [panelImage, setPanelImage] = useState('/logotipo.png')
    const [panelTitle, setPanelTitle] = useState('Informacion del proyecto')
    const [currentMeshName, setCurrentMeshName] = useState(null)
    const { setIsFloatingPanelActive, setCameraMode, setTipologyResidencias } = useCharacterCustomization()

    //Listen for custom events from Experience component
    useEffect(() => {
        const handleAnnotationClick = (event) => {
            const { image, annotation, meshName } = event.detail
            setPanelImage(`/${image}`)
            setPanelTitle(annotation)
            setCurrentMeshName(meshName)
            setShowFloatingPanel(true)
            setIsFloatingPanelActive(true)
        }

        window.addEventListener('annotation-click', handleAnnotationClick)

        return () => {
            window.removeEventListener('annotation-click', handleAnnotationClick)
        }

    }, [setIsFloatingPanelActive])




    //Listen for return from 360 tour
    useEffect(() => {
        const handleReturnFrom360 = (event) => {
            const { meshName } = event.detail
            
            // Set camera mode to RESIDENCIAS
            setCameraMode(CameraModes.RESIDENCIAS)
            
            // Activate the tipology for the returned mesh
            setTipologyResidencias([meshName])
            
            
            const mapping = objectMappings[meshName]
            if (mapping) {
                setPanelImage(`/${mapping.image}`)
                setPanelTitle(mapping.title)
                setCurrentMeshName(meshName)
                setShowFloatingPanel(true)
                setIsFloatingPanelActive(true)
            }
        }

        window.addEventListener('return-from-360', handleReturnFrom360)

        return () => {
            window.removeEventListener('return-from-360', handleReturnFrom360)
        }

    }, [setCameraMode, setIsFloatingPanelActive, setTipologyResidencias])






    const closeFloatingPanel = () => {
        setShowFloatingPanel(false)
        setPanelImage('/logotipo.png')
        setPanelTitle('Informacion del proyecto')
        setCurrentMeshName(null)
        setIsFloatingPanelActive(false)
    }

    const openModalPanel = () => {
        setShowModalPanel(true)
    }

    const closeModalPanel = () => {
        setShowModalPanel(false)
    }



    return(
        <>
        
        
        {/* Logotipo del desarrollo */}
        <div className="logo-container">
            <img src="/logotipo.png" alt="Logo" />
            <div className="logo-text">INNOVATION AND TECHNOLOGY</div>
        </div>
        

        
        {/* ------------------------ */}
        {/* Navigation Words */}
        <div
            style={{
            position: 'absolute',
            top: '40px',
            right: '20px',
            display: 'flex',
            flexDirection: 'row',
            gap: '120px',
            zIndex: 10,
            transform: 'translateX(-50px)'
        }}
        >
        
            <a 
            href="https://sordomadaleno.com/projects" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
                fontSize: '25px',
                color: 'white',
                fontWeight: '500',
                textDecoration: 'none',
                cursor:'pointer',
                transition: 'opacity 0.3s'
            }} 
            onMouseOver={(e) => e.target.style.opacity = '0.7'} 
            onMouseOut={(e) => e.target.style.opacity = '1'}
            >PROJECTS</a>

            <a 
            href="http://sordomadaleno.com/studio" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
                fontSize: '25px',
                color: 'white',
                fontWeight: '500',
                textDecoration: 'none',
                cursor:'pointer',
                transition: 'opacity 0.3s'
            }} 
            onMouseOver={(e) => e.target.style.opacity = '0.7'} 
            onMouseOut={(e) => e.target.style.opacity = '1'}
            >STUDIO</a>

            <span 
            style={{
                fontSize: '25px',
                color:'white',
                fontWeight: '500',
                cursor:'pointer'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.7'} 
            onMouseOut={(e) => e.target.style.opacity = '1'}
            >TEAM</span>

            <span 
            style={{
                fontSize: '25px',
                color:'white',
                fontWeight: '500',
                cursor: 'pointer'               
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.7'} 
            onMouseOut={(e) => e.target.style.opacity = '1'}
            >HOME</span>
        </div>

        

        {/* ---------------- */}
        {/*Floating Panel */}
        {showFloatingPanel && (
            <div className="floating-panel">
                <button className="floating-panel-close" onClick={closeFloatingPanel}>x</button>
                <div className="floating-panel-content">
                    <img 
                        src={panelImage}
                        alt={panelTitle}
                        className="floating-panel-image"
                        onClick={openModalPanel}
                        style={{ cursor: 'pointer' }}
                    />
                    <h3 className="floating-panel-title">{panelTitle}</h3>
                    <Button
                        variant="outline"
                        onClick={objectMappings[currentMeshName] ? () => onTourClick(currentMeshName) : null}
                        disabled={!objectMappings[currentMeshName]}
                        style={{
                            width:'250px',
                            marginTop: '15px',
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.5)',
                            backgroundColor: objectMappings[currentMeshName] ? 'rgba(255,255,255,0.5)' : 'rgba(128,128,128,0.3)',
                            opacity: objectMappings[currentMeshName] ? 1 : 0.5,
                            cursor: objectMappings[currentMeshName] ? 'pointer' : 'not-allowed',
                            '&:hover': {
                                backgroundColor: objectMappings[currentMeshName] ? 'rgba(255,255,255,0.6)' : 'rgba(128,128,128,0.3)'
                            }
                        }}
                    >
                        TOUR
                    </Button>
                </div>
            </div>
        )}



        {/* ----------------------- */}
        {/* Modal Panel */}
        {showModalPanel && (
            <div className="modal-overlay" onClick={closeModalPanel}>
                <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-panel-close" onClick={closeModalPanel}>x</button>
                    <div className="modal-panel-content">
                        <img src={panelImage} alt={panelTitle} className="modal-panel-image" />
                        <h3 className="modal-panel-title">{panelTitle}</h3>
                    </div>
                </div>
            </div>
        )}






        </>

    )

}


export default Overlay

