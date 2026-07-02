import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Title } from "../../shared/other/extra";
import { Api } from "../../server/api";
import { Alert } from "../../shared/other/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import { ChevronRight } from "lucide-react";

const Counter = () => {
    const { actCompany, user, textAlert, typeAlert, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounterActive, listCounter } = useContext(GlobalContext)

    useEffect(() => {
        actCompany && getListCounterActive(actCompany)
    }, [actCompany, getListCounterActive])

    const navigate = useNavigate()

    function saveSelectCounter(counter: string) {
        if (counter) {
            const id_user = user?.id
            const id_front_desk = counter

            Api.post("user-assistant-add", {
                id_user,
                id_front_desk
            })
                .then(response => {
                    setTextAlert(response?.data.message)
                    setTypeAlert(true)

                    user && localStorage.setItem("actAssitant", user?.id)
                    localStorage.setItem("actCounter", counter)

                    navigate("/employee")
                })
                .catch(err => {
                    setTextAlert(err?.response?.data.message)
                    setTypeAlert(false)
                })
        }
    }

    return (
        <Fragment>
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
            {
                textAlert &&
                <Alert text={textAlert} type={typeAlert} />
            }
        </Fragment>
    );
}

export default Counter;