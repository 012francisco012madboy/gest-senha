import "../../css/admin.css"

import Nav from "../../components/admin/nav";
import Sidebar from "../../components/admin/sidebar";
import { ReactNode } from "react";

interface adminProps{
    children: ReactNode
}

const Admin = ({ children } : adminProps) => {
    return (
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
    );
}
 
export default Admin;