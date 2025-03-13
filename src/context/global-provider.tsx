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
  const { listService, getListService, getListActiveService, countService, getCountService, getEachService } = ServiceProvider()
  const { listCounter, getListCounter, getListCounterActive, countCounter, getCountCounter, getEachCounter } = CounterProvider()
  const { actTicket, countTicket, getCountTicket, listTicket, listAllTicket, setActTicket, getActTicket, getListTicket, getListAllTicket, getListLastTicket } = TicketProvider()

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
      getListActiveService,

      /* BALCÃO */
      listCounter, getListCounter,
      countCounter, getCountCounter,
      getEachCounter, getListCounterActive,

      /* TICKET */
      actTicket,
      countTicket,
      listTicket,
      listAllTicket,
      setActTicket,
      getActTicket,
      getCountTicket,
      getListTicket,
      getListAllTicket,
      getListLastTicket
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider