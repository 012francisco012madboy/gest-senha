import "../../css/emp.css"

import Nav from "../../components/emp/nav";
import Center from "../../components/emp/center";
import Footer from "../../components/emp/footer";
import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../components/other/alert";

const Emp = () => {
    const { textAlert, typeAlert } = useContext(AuthContext)
    
    return (
        <Fragment>
            <div className="emp_container">
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