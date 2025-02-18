import { useState } from "react"
import { IDefault } from "../interface/IDefault"

const ExtraProvider = () => {
    /* DEFAULT */
    const [name_company, setNameCompany] = useState("")
    const [email_company, setEmailCompany] = useState("")
    const [counter, setCounter] = useState<IDefault>({id: "", name: ""})
    const [textAlert, setTextAlert] = useState("")
    const [textQuestion, setTextQuestion] = useState("")
    const [typeAlert, setTypeAlert] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<string | null>(null)

    function voice(ticket: string, counter: string){
        if("speechSynthesis" in window){
            const text = `A seguir, Balcão ${counter}. Senha ${ticket}.`

            const value = new SpeechSynthesisUtterance(text)

            window.speechSynthesis.speak(value)
        }
    }

    return {
        voice,
        counter,
        setCounter,
        textAlert,
        setTextAlert,
        textQuestion,
        setTextQuestion,
        typeAlert,
        setTypeAlert,
        showModal,
        setShowModal,
        name_company,
        setNameCompany,
        email_company,
        setEmailCompany
    }
}

export default ExtraProvider;