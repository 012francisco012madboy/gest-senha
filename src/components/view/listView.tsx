import { useContext, useEffect, useState } from "react";
import { Title } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";

const ListView = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListAllTicket, listAllTicket } = useContext(GlobalContext)

    const [ acc, setAcc ] = useState<boolean>(false)
    
    useEffect(() => {
        setInterval(() => {
            if (acc) return;
            setAcc(true)
            actCompany && getListAllTicket(actCompany)
            setAcc(false)
        }, 5000)
    }, [actCompany, getListAllTicket])

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
                                listAllTicket?.map((each, i) => (
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