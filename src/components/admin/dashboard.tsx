import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";

const DashBoard = () => {
    const { actCompany} = useContext(AuthContext)
    const { getCountUser, getCountService, getCountCounter, countUser, countService, countCounter} = useContext(GlobalContext)

    useEffect(() => {
        if(actCompany){
            getCountUser(actCompany)
            getCountService(actCompany)
            getCountCounter(actCompany)
        }
    })
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="each-dashboard">
                    <strong>{countUser}</strong>
                    <p>Funcionários</p>
                </div>
                <div className="each-dashboard">
                    <strong>{countService}</strong>
                    <p>Serviços</p>
                </div>
                <div className="each-dashboard">
                    <strong>{countCounter}</strong>
                    <p>Balcões</p>
                </div>
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Sessões</p>
                </div>
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Senhas</p>
                </div>
            </div>
        </div>
    );
}
 
export default DashBoard;