import { useContext, useEffect } from "react";
import { PiSignOut, PiUserCircle } from "react-icons/pi";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";

const Nav = () => {
    const { getUserAssistant, actUserAssistant, logout } = useContext(AuthContext)

    useEffect(() => {
        getUserAssistant()
    }, [])

    async function handleLogout(){
        await Api.put(`user-assistant-remove/${actUserAssistant?.id_assistant}`)
        logout()
    }

    return (
        <div className="nav">
            <div className="nav_logo">
                <h1>GEST - SENHAS</h1>
            </div>
            <div className="nav_perfil">
                <div className="reference">
                    <div className="ref">
                        <strong>Balcão <span>{actUserAssistant?.ref_counter}</span></strong>
                    </div>
                </div>
                <div className="user">
                    <div className="icon">
                        <i><PiUserCircle/></i>
                    </div>
                    <div className="text">
                        <p>{actUserAssistant?.name_user}</p>
                    </div>
                </div>
                <div
                    className="user"
                    title="Terminar sessão"
                    onClick={handleLogout}
                >
                    <div className="icon">
                        <i><PiSignOut/></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Nav;