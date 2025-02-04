import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { ITicket } from "../../interface/ITicket";

const Sidebar = () => {
    const { actCompany, actUserAssistant } = useContext(AuthContext)
    const { getListTicket } = useContext(GlobalContext)

    const [ listTicket, setListTicket ] = useState<ITicket[]>()

    useEffect(() => {
        actCompany && actUserAssistant && getListTicket(actUserAssistant?.id_service, actCompany, setListTicket)
    }, [actCompany, getListTicket, actUserAssistant, setListTicket])

    return (
        <div className="table-container">
            <div className="table-content">
                <table>
                    <thead>
                        <tr>
                            <th>Senha</th>
                            <th>Serviço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listTicket?.map((each, i) => (
                                <tr key={i}>
                                    <td>{each.ref}</td>
                                    <td>{each.service}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Sidebar;