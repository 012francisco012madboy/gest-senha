import { PiUserCircle } from "react-icons/pi";

const Nav = () => {
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
                        <p>Ariel Francisco</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Nav;