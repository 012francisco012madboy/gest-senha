import { Fragment, useContext, useEffect, useState } from "react";
import { Title } from "../other/extra";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Item, ItemActions, ItemContent, ItemTitle } from "../../components/ui/item";
import { ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { Skeleton } from "../../components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAlert } from "@/provider/alert";

const Main = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListActiveService, listService } = useContext(GlobalContext)

    const { FailedAlert, SuccessAlert } = useAlert()

    const [service, setService] = useState("")

    const [disabledButton, setDisabledButton] = useState(false)

    useEffect(() => {
        actCompany && getListActiveService(actCompany)
    }, [actCompany, getListActiveService])

    async function handleTicket() {
        if (!service) {
            return console.log("Nenhum serviço selecionado")
        }

        setDisabledButton(true)

        try {
            const response = await Api.post("/ticket-add", {
                service,
                actCompany
            })

            SuccessAlert("A tua senha é: " + response?.data.ref)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
        finally {
            setDisabledButton(false)
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
                                    <Button type="button" variant="primary" onClick={handleTicket} disabled={disabledButton} className="w-full mt-2">
                                        {disabledButton ? <Spinner /> : "Confirmar"}
                                    </Button>
                                </Fragment>
                    }
                </div>
            </div>
        </div>
    );
}

export default Main;