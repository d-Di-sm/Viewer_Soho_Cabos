
import { useEffect, useState } from "react"
import { CameraModes, useCharacterCustomization } from "../../contexts/CustomizationContext"
import { Button, Group, Stack, Switch, Title } from "@mantine/core"

const ResidenciasConfigurator = () => {

    const { tipologyResidencias, setTipologyResidencias, cameraMode } = useCharacterCustomization()
    const [activeButton, setActiveButton ] = useState(null)


    // useEffect(() => {
    //     if (cameraMode != CameraModes.RESIDENCIAS) {
    //         setTipologyResidencias([])
    //     }
    // }, [cameraMode, setTipologyResidencias])

    const handleSwitchChange = (newValues) => {
        if (cameraMode === CameraModes.RESIDENCIAS) {
            setTipologyResidencias(newValues)
        }
    }

    const switchStyles = {
        root: {
            transform: 'scale(1.5)',
            transformOrigin: 'left center',
            marginBottom: '1rem',
        },
        label: {
            color: 'white',
            fontWeight: 500,
        },
        track: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'white',
            '&[dataChecked]': {
                backgroundColor: '#16a34a !important',
                borderColor: '#16a34a !important',
            }
        },
        thumb: {
            backgroundColor: 'white',
        }
    }

    return(
        <>
        <Group className="botones">
            <Stack sytle={{ marginTop: '250px' }}>
                <Title
                    order={3}
                    style={{
                        color: 'white',
                        position: 'relative',
                        top: '-275px',
                        fontSize: '2em',
                        marginBottom: '-30px',
                        transform: 'translateY(-50px)'
                    }}
                >
                    Tipologias
                </Title>

                <Switch.Group
                    value={tipologyResidencias}
                    onChange={handleSwitchChange}
                >
                    <Stack
                        gap="xl"
                        style={{
                            marginTop: '-250px'
                        }}
                    >
                        <Switch
                            value="2BR_G"
                            label="2 Bedroom Garden"
                            styles={switchStyles}
                            disabled={cameraMode !== CameraModes.RESIDENCIAS}
                        />

                        <Switch
                            value="2BR"
                            label="2 Bedroom"
                            styles={switchStyles}
                            disabled={cameraMode !== CameraModes.RESIDENCIAS}
                        />

                        <Switch
                            value="3BR_G"
                            label="3 Bedroom Garden"
                            styles={switchStyles}
                            disabled={cameraMode !== CameraModes.RESIDENCIAS}
                        />

                        <Switch
                            value="3BR"
                            label="3 Bedroom"
                            styles={switchStyles}
                            disabled={cameraMode !== CameraModes.RESIDENCIAS}
                        />

                        <Switch
                            value="4BR_T"
                            label="4 Bedroom Roof"
                            styles={switchStyles}
                            disabled={cameraMode !== CameraModes.RESIDENCIAS}
                        />

                        <Switch
                            value="4BR"
                            label="4 Bedroom"
                            styles={switchStyles}
                            disabled={cameraMode !== CameraModes.RESIDENCIAS}
                        />

                    </Stack>
                </Switch.Group>

                <div
                    style={{
                        borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
                        margin: '20px -50px',
                        width: 'calc(100% + 80px)',
                        transform: 'translateX(40px)'
                    }}
                />

                {/* <div
                    style={{
                        marginTop: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}
                >
                    <Button
                        variant={activeButton === 'AMENIDADES' ? 'filled' : 'outline'}
                        onClick={() => handleAnnotationClick("Im01.png", "AMENIDADES", "AMENIDADES")}
                        style={{
                            width: '250px',
                            marginLeft: '50px',
                            color: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            backgroundColor: activeButton === 'AMENIDADES' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                            '&:hover':{
                                backgroundColor: activeButton === 'AMENIDADES' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        AMENIDADES
                    </Button>


                </div> */}

            </Stack>
        </Group>
        
        
        </>

    )
}


export default ResidenciasConfigurator





