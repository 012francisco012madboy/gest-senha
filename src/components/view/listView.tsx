import { useContext, useEffect, useState } from "react";
import { Title } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { ITicket } from "../../interface/ITicket";

const ListView = () => {
    const {actCompany} = useContext(AuthContext)
    const {getListAllTicket} = useContext(GlobalContext)

    const [ listTicket, setListTicket ] = useState<ITicket[]>()

    useEffect(() => {
        actCompany && getListAllTicket(actCompany, setListTicket)
    }, [actCompany, getListAllTicket, setListTicket])

    return (
        <div className="list_view">
            <Title title="Senhas em espera"/>
            <div className="table-container">
                <div className="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Senha</th>
                                <th>Serviço</th>
                                <th>Balcão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listTicket?.map((each, i) => (
                                    <tr key={i}>
                                        <td>{each.ref}</td>
                                        <td>{each.service}</td>
                                        <td>Em espera</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default ListView;