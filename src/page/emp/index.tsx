import "../../css/emp.css"

import Nav from "../../shared/emp/nav";
import Center from "../../shared/emp/center";
import Footer from "../../shared/emp/footer";
import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../shared/other/alert";

const Emp = () => {
    const { textAlert, typeAlert } = useContext(AuthContext)
    
    return (
        <Fragment>
            <div className="w-full h-dvh flex flex-col gap-4 justify-between overflow-hidden">
                <Nav/>
                <Center/>
                <Footer/>
            </div>
            {
                textAlert &&
                <Alert text={textAlert} type={typeAlert}/>
            }
        </Fragment>
    );
}
 
export default Emp;