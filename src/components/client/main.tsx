import { useContext, useEffect, useState } from "react";
import { Load, Title } from "../other/extra";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { PiCheckCircle } from "react-icons/pi";
import { Api } from "../../server/api";

const Main = () => {
    const { actCompany, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListActiveService, listService } = useContext(GlobalContext)

    const [ service, setService ] = useState("")
    
    const [ ticket, setTicket ] = useState("")

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    useEffect(() => {
        actCompany && getListActiveService(actCompany)
    }, [actCompany, getListActiveService])

    function cleanTicket(){
        const timer = setTimeout(() => {
            setTicket("")
        }, 2000)

        return () => clearTimeout(timer);
    }

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
                
                setTicket(response?.data.ref)
                cleanTicket()

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
                    listService?.map((each, i) => (
                        <div
                            key={i}
                            className={service == each.id ? "each_serv active" : "each_serv"}
                            onClick={() => setService(each.id)}
                        >
                            <p>{each.name}</p>
                            <i>{service == each.id ? <PiCheckCircle/> : ""}</i>
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
            <div className="result">
                <strong className={ticket ? "active" : ""}>A tua senha é: {ticket}</strong>
            </div>
        </div>
    );
}
 
export default Main;