import { useCallback, useState } from "react"
import { Api } from "../server/api"
import { INotice, INoticeArticle } from "../interface/INotice"

const NoticeProvider = () => {
    /* NOTICE DATA */
    
    const [ destaqueNotice, setDestaqueNotice ] =  useState<INotice[]>()
    const [ articleNotice, setArticleNotice ] =  useState<INoticeArticle[]>()
    const [ countNotice, setCountNotice ] =  useState("")

    const getListNotice = useCallback( async(setListNotice: (data: INotice[]) => void) => {
        await Api.get(`post-view`)
        .then((response) =>{
            setListNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getEachNotice = useCallback( async(id: string, setEachNotice: (data: INotice) => void) => {
        await Api.get(`post-show/${id}`)
        .then((response) =>{
            setEachNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCategorieNotice = useCallback( async(categorie: string, setListNotice: (data: INotice[]) => void) => {
        await Api.get(`post-categorie/${categorie}`)
        .then((response) =>{
            setListNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getRelatedNotice = useCallback( async(id_post: string, setListNotice: (data: INotice[]) => void) => {
        await Api.get(`post-related/${id_post}`)
        .then((response) =>{
            setListNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getSearchNotice = useCallback( async(search: string, setListNotice: (data: INotice[]) => void) => {
        await Api.get(`post-search/${search}`)
        .then((response) =>{
            setListNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getBannerNotice = useCallback( async(setBannerNotice: (data: INotice[]) => void) => {
        await Api.get(`post-banner`)
        .then((response) =>{
            setBannerNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getDestaqueNotice = useCallback( async() => {
        await Api.get(`post-destaque`)
        .then((response) =>{
            setDestaqueNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getArticleNotice = useCallback( async() => {
        await Api.get(`post-article`)
        .then((response) =>{
            setArticleNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    const getCountNotice = useCallback( async() => {
        await Api.get(`post-count`)
        .then((response) =>{
            setCountNotice(response?.data)
        })
        .catch(erro =>{
            console.log(erro)
        })
    }, [])

    return {
        getListNotice,
        countNotice,
        getCountNotice,
        getEachNotice,
        getCategorieNotice,
        destaqueNotice,
        getDestaqueNotice,
        articleNotice,
        getArticleNotice,
        getRelatedNotice,
        getSearchNotice,
        getBannerNotice
    }
}
 
export default NoticeProvider;