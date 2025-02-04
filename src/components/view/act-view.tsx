import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { ITicket } from "../../interface/ITicket";

const ActView = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListLastTicket} = useContext(GlobalContext)

    const [ ticket, setTicket ] = useState<ITicket>()

    useEffect(() => {
        actCompany && getListLastTicket(actCompany, setTicket)
    }, [actCompany, getListLastTicket, setTicket])

    return (
        <div className="act_view">
            <div className="each_view left">
                <div className="text">
                    <p>{ticket?.ref}</p>
                    <strong>Senha</strong>
                </div>
            </div>
            <div className="each_view right">
                <div className="text">
                    <p>{ticket?.counter}</p>
                    <strong>Balcão</strong>
                </div>
            </div>
        </div>
    );
}
 
export default ActView;