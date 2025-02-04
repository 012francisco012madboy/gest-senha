import "../../css/admin.css"

import Nav from "../../components/admin/nav";
import Sidebar from "../../components/admin/sidebar";
import { Fragment, ReactNode, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../components/other/alert";

interface adminProps{
    children: ReactNode
}

const Admin = ({ children } : adminProps) => {
    const { textAlert, typeAlert} = useContext(AuthContext)
    return (
        <Fragment>
            <div className="admin_container">
                <Nav/>
                <div className="center">
                    <div className="left">
                        <Sidebar/>
                    </div>
                    <div className="right">
                        {children}
                    </div>
                </div>
            </div>
            {
                textAlert &&
                <Alert text={textAlert} type={typeAlert}/>
            }
        </Fragment>
    );
}
 
export default Admin;