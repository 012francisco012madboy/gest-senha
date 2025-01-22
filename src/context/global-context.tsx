import { createContext } from "react"
import { IAdmin } from "../interface/IAdmin"
import { ICategorie } from "../interface/ICategorie"
import { IMessage } from "../interface/IMessage"
import { INotice, INoticeArticle } from "../interface/INotice"

interface GlobalContextData{
  /* ADMIN */
  listAdmin: IAdmin[] | undefined
  getListAdmin: () => void
  countAdmin: string
  getCountAdmin: () => void
  
  /* CATEGORIE */
  listCategorie: ICategorie[] | undefined
  getListCategorie: () => void
  listState: ICategorie[] | undefined
  getListState: () => void
  countCategorie: string
  getCountCategorie: () => void
  getEachCategorie: (data: string, setEachCategorie: (data: ICategorie) => void) => void
  
  /* NOTICE */
  getListNotice: (setListNotice: (data: INotice[]) => void) => void
  getEachNotice: (data: string, setEachNotice: (data: INotice) => void) => void
  getCategorieNotice: (data: string, setListNotice: (data: INotice[]) => void) => void
  getRelatedNotice: (data: string, setListNotice: (data: INotice[]) => void) => void
  getSearchNotice: (data: string, setListNotice: (data: INotice[]) => void) => void
  getBannerNotice: (setBannerNotice: (data: INotice[]) => void) => void
  destaqueNotice: INotice[] | undefined
  getDestaqueNotice: () => void
  articleNotice: INoticeArticle[] | undefined
  getArticleNotice: () => void
  countNotice: string
  getCountNotice: () => void
  
  /* MESSAGE */
  listMessage: IMessage[] | undefined
  getListMessage: () => void
  countMessage: string
  getCountMessage: () => void
}

export const GlobalContext = createContext({} as GlobalContextData)