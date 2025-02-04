import { useContext, useEffect, useState } from "react";
import { Load, Title } from "../other/extra";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { PiCheckCircle } from "react-icons/pi";
import { Api } from "../../server/api";

const Main = () => {
    const { actCompany, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounterActive, listCounter } = useContext(GlobalContext)

    const [ service, setService ] = useState("")

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    useEffect(() => {
        actCompany && getListCounterActive(actCompany)
    }, [actCompany, getListCounterActive])

    function handleTicket(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(service){
            setBtnDisabled(true)

            Api.post("/ticket-add", {
                service,
                actCompany
            })
            .then((response) => {
                setTextAlert(response?.data.message)
                setTypeAlert(true)

                setBtnDisabled(false)

                setService("")
            })
            .catch((err) => {
                setTextAlert(err?.response?.data.message)
                setTypeAlert(false)

                setBtnDisabled(false)

                setService("")
            })
        }
    }

    return (
        <div className="main">
            <Title title="Criar senhas"/>
            <div className="services">
                {
                    listCounter?.map((each, i) => (
                        <div
                            key={i}
                            className={service == each.id_service ? "each_serv active" : "each_serv"}
                            onClick={() => setService(each.id_service)}
                        >
                            <p>{each.service}</p>
                            <i>{service == each.id_service ? <PiCheckCircle/> : ""}</i>
                        </div>
                    ))
                }
            </div>
            <form onSubmit={(e) => handleTicket(e)}>
                <button
                    type="submit"
                    disabled={btnDisabled}
                    className={service && "active"}
                >
                    {btnDisabled ? <Load/> : "Confirmar"}
                </button>
            </form>
        </div>
    );
}
 
export default Main;