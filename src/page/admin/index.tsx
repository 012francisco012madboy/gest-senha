import Nav from "../../layout/admin/nav";
import Sidebar from "../../shared/admin/sidebar";
import { Fragment, ReactNode } from "react";

interface adminProps {
    children: ReactNode
}

const Admin = ({ children }: adminProps) => {
    return (
        <Fragment>
            <div className="admin_container">
                <Nav />
                <div className="center">
                    <div className="left">
                        <Sidebar />
                    </div>
                    <div className="right">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Admin;