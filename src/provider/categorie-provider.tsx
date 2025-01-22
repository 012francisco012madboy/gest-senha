import { useCallback, useState } from "react"
import { Api } from "../server/api"
import { ICategorie } from "../interface/ICategorie"

const CategorieProvider = () => {
    /* CATEGORIE DATA */
    
    const [ listCategorie, setListCategorie ] =  useState<ICategorie[]>([])
    const [ listState, setListState ] =  useState<ICategorie[]>([])
    const [ countCategorie, setCountCategorie ] =  useState("")

    const getListCategorie = useCallback( async() => {
        await Api.get(`categorie-view`)
        .then((response) =>{
            setListCategorie(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getListState = useCallback( async() => {
        await Api.get(`state-view`)
        .then((response) =>{
            setListState(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountCategorie = useCallback( async() => {
        await Api.get(`categorie-count`)
        .then((response) =>{
            setCountCategorie(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getEachCategorie = useCallback( async(id: string, setEachCategorie: (data: ICategorie) => void) => {
        await Api.get(`categorie-show/${id}`)
        .then((response) =>{
            setEachCategorie(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        listCategorie,
        getListCategorie,
        countCategorie,
        getCountCategorie,
        listState,
        getListState,
        getEachCategorie
    }
}
 
export default CategorieProvider;