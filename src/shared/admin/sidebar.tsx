import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Sidebar = () => {
    const { logout } = useContext(AuthContext)

    return (
        <div className={"sidebar-container active"}>
            <div className="sidebar-content">
                <Link to={"/admin"}>
                    <div className={location.pathname == "/admin" ? "each-sidebar active" : "each-sidebar"}>
                        <p>Dashboard</p>
                    </div>
                </Link>
                <Link to={"/admin/list-employee"}>
                    <div className={location.pathname == "/admin/list-employee" ? "each-sidebar active" : "each-sidebar"}>
                        <p>Funcionários</p>
                    </div>
                </Link>
                <Link to={"/admin/list-service"}>
                    <div className={location.pathname == "/admin/list-service" ? "each-sidebar active" : "each-sidebar"}>
                        <p>Serviços</p>
                    </div>
                </Link>
                <Link to={"/admin/list-counter"}>
                    <div className={location.pathname == "/admin/list-counter" ? "each-sidebar active" : "each-sidebar"}>
                        <p>Balcões</p>
                    </div>
                </Link>
                {/* <Link to={"/admin/list-session"}>
                    <div className={location.pathname == "/admin/list-session" ? "each-sidebar active" : "each-sidebar"}>
                        <p>Sessões</p>
                    </div>
                </Link> */}
            </div>
            <div className="sidebar-content">
                <div onClick={logout} className="each-sidebar">
                    <p>Sair</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;