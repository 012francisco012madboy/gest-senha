import { ReactNode } from "react"
import { GlobalContext } from "./global-context"
import ServiceProvider from "../provider/service-provider"
import CounterProvider from "../provider/counter-provider"
import UserProvider from "../provider/user-provider"
import TicketProvider from "../provider/ticket-provider"

interface ContextProps{
  children: ReactNode
}

function GlobalProvider({children}: ContextProps){
  /* PROVIDER */
  const { listUser, getListUser, countUser, getCountUser, getEachUser } = UserProvider()
  const { listService, getListService, countService, getCountService, getEachService } = ServiceProvider()
  const { listCounter, getListCounter, getListCounterActive, countCounter, getCountCounter, getEachCounter } = CounterProvider()
  const { actTicket, listTicket, listAllTicket, setActTicket, getListTicket, getListAllTicket, getListLastTicket, getNextTicket } = TicketProvider()

  return(
    <GlobalContext.Provider value={{
      /* USER */
      listUser, getListUser,
      countUser, getCountUser,
      getEachUser,

      /* SERVIÇOS */
      listService, getListService,
      countService, getCountService,
      getEachService,

      /* BALCÃO */
      listCounter, getListCounter,
      countCounter, getCountCounter,
      getEachCounter, getListCounterActive,

      /* TICKET */
      actTicket,
      listTicket,
      listAllTicket,
      setActTicket,
      getListTicket,
      getListAllTicket,
      getListLastTicket,
      getNextTicket
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider