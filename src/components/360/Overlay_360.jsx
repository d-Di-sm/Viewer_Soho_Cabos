
import { useEffect, useState } from 'react'
import '../Overlay.css'
import { TourModes, useTourCustomization } from '../../contexts/CustomizationContextTour'



const Overlay360 = ({ panelImage = '/Im01.png', panelTitle = 'Panel de Información' }) => {

    const [showModalPanel, setShowModalPanel] = useState(false)
    // const [panelImage, setPanelImage] = useState('/Im01.png')
    // const [panelTitle, setPanelTitle] = useState('Prueba')
    const { tourMode, setTourMode, setIsModalPanelActive } = useTourCustomization()
    
    
    //Listen for custom events from Experience component
    // useEffect(() => {
    //     const handleAnnotationClick = (event) => {
    //         const { image, annotation } = event.detail
    //         setPanelImage(`/${image}`)
    //         setPanelTitle(annotation)
    //         setShowModalPanel(true)
    //         setIsModalPanelActive(true)
    //     }

    //     window.addEventListener('annotation-click', handleAnnotationClick)

    //     return () => {
    //         window.removeEventListener('annotation-click', handleAnnotationClick)
    //     }

    // }, [setIsModalPanelActive])


useEffect(() => {
  if (tourMode === TourModes.INFO) {
    setIsModalPanelActive(true);
    setShowModalPanel(true);
  }
}, [tourMode]);

    // const openModalPanel = () => {
    //     setShowModalPanel(true)
    // }

    const closeModalPanel = () => {
        setShowModalPanel(false)
        setIsModalPanelActive(false)
        setTourMode(TourModes.BUTTON)
    }


    return(
        <>
        {/* Logotipo del desarrollo */}
        <div className="logo-container">
            <img src="/logotipo.png" alt="Logo" />
            <div className="logo-text">INNOVATION AND TECHNOLOGY</div>
        </div>


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


export default Overlay360




