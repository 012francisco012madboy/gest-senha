import { useState } from "react"

const ExtraProvider = () => {
    /* DEFAULT */
    const [textAlert, setTextAlert] = useState("")
    const [typeAlert, setTypeAlert] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<string | null>(null)

    return {
        textAlert,
        setTextAlert,
        typeAlert,
        setTypeAlert,
        showModal,
        setShowModal
    }
}

export default ExtraProvider;