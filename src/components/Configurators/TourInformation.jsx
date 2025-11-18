
import { useEffect, useState } from "react"
import { CameraModes, useCharacterCustomization } from "../../contexts/CustomizationContext"
import { Button, Group, Stack, Switch, Title } from "@mantine/core"

const ResidenciasConfigurator = () => {

    const { tipologyResidencias, setTipologyResidencias, cameraMode } = useCharacterCustomization()
    const [activeButton, setActiveButton ] = useState(null)

    return null

}
