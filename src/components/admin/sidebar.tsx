import { Link } from "react-router-dom";

const Sidebar = () => {
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
                  <Link to={"/admin/list-session"}>
                      <div className={location.pathname == "/admin/list-session" ? "each-sidebar active" : "each-sidebar"}>
                          <p>Sessões</p>
                      </div>
                  </Link>
              </div>
              <div className="sidebar-content">
                  <Link to={"/sign-in"}>
                      <div className="each-sidebar">
                          <p>Sair</p>
                      </div>
                  </Link>
              </div>
          </div>
     );
}
 
export default Sidebar;