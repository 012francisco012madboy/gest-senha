import { useCallback, useState } from "react"
import { IMessage } from "../interface/IMessage"
import { Api } from "../server/api"

const MessageProvider = () => {
    /* MESSAGE DATA */
    
    const [ listMessage, setListMessage ] =  useState<IMessage[]>([])
    const [ countMessage, setCountMessage ] =  useState("")

    const getListMessage = useCallback( async() => {
        await Api.get(`message-view`)
        .then((response) =>{
            setListMessage(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountMessage = useCallback( async() => {
        await Api.get(`message-count`)
        .then((response) =>{
            setCountMessage(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        listMessage,
        getListMessage,
        countMessage,
        getCountMessage
    }
}
 
export default MessageProvider;