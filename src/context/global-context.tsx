import { createContext } from "react"
import { IDefault } from "../interface/IDefault"
import { ICounter } from "../interface/ICounter"
import { IUser } from "../interface/IUser"
import { ITicket } from "../interface/ITicket"

interface GlobalContextData{
  /* USER */
  listUser: IUser[] | undefined
  getListUser: (data: string) => void
  countUser: string
  getCountUser: (data: string) => void
  getEachUser: (data: string, setEachUser: (data: IUser) => void) => void
  
  /* SERVIÇOS */
  listService: IDefault[] | undefined
  getListService: (data: string) => void
  countService: string
  getCountService: (data: string) => void
  getEachService: (data: string, setEachService: (data: IDefault) => void) => void
  
  /* BALCÃO */
  listCounter: ICounter[] | undefined
  getListCounter: (data: string) => void
  getListCounterActive: (data: string) => void
  countCounter: string
  getCountCounter: (data: string) => void
  getEachCounter: (data: string, setEachCounter: (data: ICounter) => void) => void
  
  /* TICKET */
  countTicket: string
  actTicket: ITicket | undefined
  listTicket: ITicket[] | undefined
  listAllTicket: ITicket[] | undefined
  setActTicket: (data: ITicket | undefined) => void
  getCountTicket: (data: string) => void
  getListTicket: (service: string, company: string) => void
  getListAllTicket: (company: string) => void
  getListLastTicket: (company: string, setTicket: (data: ITicket) => void) => void
}

export const GlobalContext = createContext({} as GlobalContextData)