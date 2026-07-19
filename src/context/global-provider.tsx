import { ReactNode } from "react"
import { GlobalContext } from "./global-context"
import ServiceProvider from "../provider/service-provider"
import CounterProvider from "../provider/counter-provider"
import UserProvider from "../provider/user-provider"
import TicketProvider from "../provider/ticket-provider"
import ExtraProvider from "@/provider/extra-provider"
import AssociateProvider from "@/provider/associate-provider"

interface ContextProps{
  children: ReactNode
}

function GlobalProvider({children}: ContextProps){
  /* PROVIDER */
  const { voice, count, getCount } = ExtraProvider()
  const { listUser, getListUser } = UserProvider()
  const { listService, getListService, getListActiveService } = ServiceProvider()
  const { listCounter, getListCounter, getListCounterActive } = CounterProvider()
  const { listAssociate, getListAssociate } = AssociateProvider()
  const { listTicket, getListTicket } = TicketProvider()

  return(
    <GlobalContext.Provider value={{
      /* EXTRA */
      count,
      voice,
      getCount,

      /* USER */
      listUser,
      getListUser,

      /* SERVIÇOS */
      listService,
      getListService,
      getListActiveService,

      /* BALCÃO */
      listCounter,
      getListCounter,
      getListCounterActive,

      /* ASSOCIATE */
      listAssociate,
      getListAssociate,

      /* TICKET */
      listTicket,
      getListTicket,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider