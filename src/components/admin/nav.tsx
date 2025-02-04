import { useContext } from "react";
import { PiUserCircle } from "react-icons/pi";
import { AuthContext } from "../../context/auth-context";

const Nav = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="nav">
            <div className="nav_logo">
                <h1>GEST - SENHAS</h1>
            </div>
            <div className="nav_perfil">
                <div className="perfil_user">
                    <div className="icon">
                        <i><PiUserCircle/></i>
                    </div>
                    <div className="text">
                        <p>{user?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Nav;