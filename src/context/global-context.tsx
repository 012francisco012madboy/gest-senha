import { createContext } from "react"
import { ICounter } from "../interface/ICounter"
import { IUser } from "../interface/IUser"
import { ITicket } from "../interface/ITicket"
import { ICount } from "@/interface/ICount"
import { IService } from "@/interface/IService"
import { IAssociate } from "@/interface/IAssociate"

interface GlobalContextData{
  /* EXTRA */
  getCount: () => void
  count: ICount | undefined
  voice: (ticket: string, counter: string) => void

  /* USER */
  listUser: IUser[] | undefined
  getListUser: () => void
  
  /* SERVIÇOS */
  listService: IService[] | undefined
  getListService: () => void
  getListActiveService: () => void
  
  /* BALCÃO */
  listCounter: ICounter[] | undefined
  getListCounter: () => void
  getListCounterActive: () => void
  
  /* ASSOCIATE */
  listAssociate: IAssociate[] | undefined
  getListAssociate: () => void
  
  /* TICKET */
  listTicket: ITicket[] | undefined
  getListTicket: () => void
}

export const GlobalContext = createContext({} as GlobalContextData)