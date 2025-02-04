import "../../css/client.css"

import Main from "../../components/client/main";
import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../components/other/alert";

const Client = () => {
    const { textAlert, typeAlert } = useContext(AuthContext)
    return (
        <Fragment>
            <div className="client_container">
                <Main/>
            </div>
            {
                textAlert &&
                <Alert text={textAlert} type={typeAlert}/>
            }
        </Fragment>
    );
}
 
export default Client;