import { ReactNode } from "react"
import { GlobalContext } from "./global-context"
import AdminProvider from "../provider/admin-provider"
import CategorieProvider from "../provider/categorie-provider"
import MessageProvider from "../provider/message-provider"
import NoticeProvider from "../provider/notice-provider"

interface ContextProps{
  children: ReactNode
}

function GlobalProvider({children}: ContextProps){
  /* PROVIDER */
  const { listAdmin, getListAdmin, countAdmin, getCountAdmin} = AdminProvider()
  const { listCategorie, getListCategorie, countCategorie, getCountCategorie, listState, getListState, getEachCategorie } = CategorieProvider()
  const { getListNotice, countNotice, getCountNotice, getEachNotice, getCategorieNotice, getRelatedNotice, getSearchNotice, destaqueNotice, getDestaqueNotice, articleNotice, getArticleNotice, getBannerNotice } = NoticeProvider()
  const { listMessage, getListMessage, countMessage, getCountMessage } = MessageProvider()

  return(
    <GlobalContext.Provider value={{
      /* ADMIN */
      listAdmin, getListAdmin,
      countAdmin, getCountAdmin,

      /* CATEGORIE */
      listCategorie, getListCategorie,
      countCategorie, getCountCategorie,
      listState, getListState,
      getEachCategorie,

      /* NOTICE */
      getListNotice,
      countNotice, getCountNotice,
      getEachNotice,
      getCategorieNotice,
      getRelatedNotice,
      destaqueNotice, getDestaqueNotice,
      articleNotice, getArticleNotice,
      getSearchNotice,
      getBannerNotice,

      /* MESSAGE */
      listMessage, getListMessage,
      countMessage, getCountMessage

    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider