import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Title } from "../../shared/other/extra";
import { Api } from "../../server/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import { ChevronRight } from "lucide-react";
import { useAlert } from "@/provider/alert";
import axios from "axios";

const Counter = () => {
    const { actCompany, user } = useContext(AuthContext)
    const { getListCounterActive, listCounter } = useContext(GlobalContext)

    const { FailedAlert, SuccessAlert } = useAlert()

    useEffect(() => {
        actCompany && getListCounterActive(actCompany)
    }, [actCompany, getListCounterActive])

    const navigate = useNavigate()

    async function saveSelectCounter(counter: string) {
        if (counter == "") {
            FailedAlert("Nenhum balcão selecionado")
        }
        const id_user = user?.id
        const id_front_desk = counter

        try {
            const response = await Api.post("user-assistant-add", {
                id_user,
                id_front_desk
            })

            SuccessAlert(response?.data.message)

            user && localStorage.setItem("actAssitant", user?.id)
            localStorage.setItem("actCounter", counter)

            navigate("/employee")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
    }

    return (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-xs w-full flex flex-col items-center justify-center gap-4 sm:gap-8">
                <Title title="Balcões de serviços" />
                <div className="w-full flex flex-col gap-2">
                    {
                        listCounter?.length == undefined ?
                            <Fragment>
                                <Skeleton className="w-full h-10 rounded-lg" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                                <Skeleton className="w-full h-10 rounded-lg" />
                            </Fragment> :
                            listCounter.length == 0 ?
                                <p className="text-brand text-center">Nenhum balcão disponível</p> :
                                <Fragment>
                                    {
                                        listCounter?.map((each, i) => (
                                            <div key={i} onClick={() => saveSelectCounter(each.id_front_desk)}>
                                                <Item variant="outline">
                                                    <ItemContent>
                                                        <ItemTitle>Balcão {each.ref}</ItemTitle>
                                                    </ItemContent>
                                                    <ItemActions>
                                                        <ChevronRight className="size-6" />
                                                    </ItemActions>
                                                </Item>
                                            </div>
                                        ))
                                    }
                                </Fragment>
                    }
                </div>
            </div>
        </div>
    );
}

export default Counter;