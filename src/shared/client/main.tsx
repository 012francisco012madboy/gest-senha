import { Fragment, useContext, useEffect, useState } from "react";
import { Title } from "../../components/title";
import { GlobalContext } from "../../context/global-context";
import authApi from "../../server/api";
import { Item, ItemActions, ItemContent, ItemDescription } from "../../components/ui/item";
import { ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { Skeleton } from "../../components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAlert } from "@/provider/alert";
import ApiEcho from "@/server/echo";
import { Pattern } from "@/components/pattern";

const Main = () => {
    const { getListServiceActive, listService } = useContext(GlobalContext)

    const { FailedAlert, SuccessAlert } = useAlert()

    const [service_id, setService_id] = useState("")

    const [disabledButton, setDisabledButton] = useState(false)

    useEffect(() => {
        getListServiceActive()

        const channel = ApiEcho.channel(`current-service`)

        channel.listen("current_service", () => {
            getListServiceActive();
        });

        return () => {
            ApiEcho.leave("current-service");
        };
    }, [getListServiceActive])

    async function handleTicket() {
        if (!service_id) {
            return FailedAlert("Nenhum serviço selecionado")
        }

        setDisabledButton(true)

        try {
            const response = await authApi.post("ticket", {
                service_id
            })

            setService_id("")

            SuccessAlert("A tua senha é: " + response?.data.ticket)
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

    function handleSelectService(id: string) {
        setService_id(e => e != id ? id : "")
    }

    return (
        <Pattern>
            <div className="max-w-md w-full p-8 pt-12 flex flex-col gap-8 rounded-xl shadow-xl border border-input z-10 bg-white">
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
                                <p className="text-red-500 text-center">Nenhum serviço disponível</p> :
                                <Fragment>
                                    {
                                        listService?.map((each, i) => (
                                            <div key={i} onClick={() => handleSelectService(each.id)}>
                                                <Item variant="outline" className={`${service_id == each.id && "bg-gray-100"}`}>
                                                    <ItemContent>
                                                        <ItemDescription>{each.name}</ItemDescription>
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
        </Pattern>
    );
}

export default Main;