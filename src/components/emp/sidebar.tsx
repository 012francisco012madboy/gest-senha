import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";

const Sidebar = () => {
    const { actCompany, actUserAssistant } = useContext(AuthContext)
    const { getListTicket, listTicket } = useContext(GlobalContext)

    useEffect(() => {
        actCompany && actUserAssistant && getListTicket(actUserAssistant?.id_service, actCompany)
    }, [actCompany, getListTicket, actUserAssistant])

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