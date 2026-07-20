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
  const { count, getCount } = ExtraProvider()
  const { listUser, getListUser } = UserProvider()
  const { listService, getListService, getListActiveService } = ServiceProvider()
  const { counterOpen, listCounter, getCounterOpen, getListCounter, getListCounterActive } = CounterProvider()
  const { listAssociate, getListAssociate } = AssociateProvider()
  const { voice, lastTicket, listTicket, listCounterTicket, setLastTicket, getNextTicket, getLastTicket, getListTicket, getListCounterTicket } = TicketProvider()

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
      counterOpen,
      listCounter,
      getCounterOpen,
      getListCounter,
      getListCounterActive,

      /* ASSOCIATE */
      listAssociate,
      getListAssociate,

      /* TICKET */
      lastTicket,
      listTicket,
      listCounterTicket,
      setLastTicket,
      getNextTicket,
      getLastTicket,
      getListTicket,
      getListCounterTicket,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider