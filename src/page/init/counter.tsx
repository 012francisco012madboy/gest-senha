import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/global-context";
import { Title } from "../../components/title";
import authApi from "../../server/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import { ChevronRight } from "lucide-react";
import { useAlert } from "@/provider/alert";
import axios from "axios";
import { AuthContext } from "@/context/auth-context";
import { IUser } from "@/interface/IUser";

const Counter = () => {
    const { user, setUser } = useContext(AuthContext)
    const { getListCounterActive, listCounter } = useContext(GlobalContext)
    
    const [disabledButton, setDisabledButton] = useState(false);

    const { FailedAlert, SuccessAlert } = useAlert()

    const navigate = useNavigate()

    useEffect(() => {
        if (user && user?.current_counter) {
            navigate("/employee")
        }
        else {
            getListCounterActive()
        }
    }, [user, getListCounterActive])

    async function saveSelectCounter(counter_id: string) {
        if (counter_id == "") {
            return FailedAlert("Nenhum balcão selecionado")
        }

        setDisabledButton(true)

        try {
            const response = await authApi.post("user/open", {
                counter_id
            })

            SuccessAlert(response?.data.message)

            setUser({
                ...user,
                current_counter: true
            } as IUser);

            navigate("/employee")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
        finally{
            setDisabledButton(false)
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
                                            <div key={i} onClick={() => saveSelectCounter(each.id)} className={`${disabledButton && "pointer-events-none"}`}>
                                                <Item variant="outline">
                                                    <ItemContent>
                                                        <ItemTitle>Balcão {each.reference}</ItemTitle>
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