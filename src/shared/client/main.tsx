import { Fragment, useContext, useEffect, useState } from "react";
import { Load, Title } from "../other/extra";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Item, ItemActions, ItemContent, ItemTitle } from "../../components/ui/item";
import { ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { Skeleton } from "../../components/ui/skeleton";

const Main = () => {
    const { actCompany, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListActiveService, listService } = useContext(GlobalContext)

    const [service, setService] = useState("")

    const [ticket, setTicket] = useState("")

    const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {
        actCompany && getListActiveService(actCompany)
    }, [actCompany, getListActiveService])

    function cleanTicket() {
        const timer = setTimeout(() => {
            setTicket("")
        }, 2000)

        return () => clearTimeout(timer);
    }

    async function handleTicket() {
        if (!service) {
            return console.log("Nenhum serviço selecionado")
        }

        setBtnDisabled(true)

        try {
            const response = await Api.post("/ticket-add", {
                service,
                actCompany
            })

            setTextAlert(response?.data.message)
            setTypeAlert(true)

            setTicket(response?.data.ref)
            cleanTicket()
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
            }
            else {
                setTextAlert("Erro inesperado")
            }
            setTypeAlert(false)
        }
        finally {
            setBtnDisabled(false)
        }
    }

    return (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-xs w-full flex flex-col items-center justify-center gap-4 sm:gap-8">
                <Title title="Criar senhas" />
                <div className="w-full flex flex-col gap-2">
                    {
                        listService?.length == undefined ?
                            <Fragment>
                                <Skeleton className="w-full h-10 rounded-lg" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </Fragment> :
                            listService.length == 0 ?
                                <p className="text-brand text-center">Nenhum serviço disponível</p> :
                                <Fragment>
                                    {
                                        listService?.map((each, i) => (
                                            <div key={i} onClick={() => setService(each.id)}>
                                                <Item variant="outline" className={`${service == each.id && "bg-gray-50"}`}>
                                                    <ItemContent>
                                                        <ItemTitle>{each.name}</ItemTitle>
                                                    </ItemContent>
                                                    <ItemActions>
                                                        <ChevronRight className="size-6" />
                                                    </ItemActions>
                                                </Item>
                                            </div>
                                        ))
                                    }
                                    <Button type="button" variant="primary" onClick={handleTicket} disabled={btnDisabled} className="w-full mt-2">
                                        {btnDisabled ? <Load /> : "Confirmar"}
                                    </Button>
                                </Fragment>
                    }
                </div>
                <div className="result">
                    <strong className={ticket ? "active" : ""}>A tua senha é: {ticket}</strong>
                </div>
            </div>
        </div>
    );
}

export default Main;