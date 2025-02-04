import { Fragment, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { SubTitle } from "../../components/other/extra";
import { Api } from "../../server/api";
import { Alert } from "../../components/other/alert";

const Counter = () => {
    const { actCompany, user, textAlert, typeAlert, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListCounterActive, listCounter } = useContext(GlobalContext)

    useEffect(() => {
        actCompany && getListCounterActive(actCompany)
    }, [actCompany, getListCounterActive])

    const navigate = useNavigate()

    function saveSelectCounter(counter: string){
        if(counter){
            const id_user = user?.id
            const id_front_desk = counter

            Api.post("user-assistant-add", {
                id_user,
                id_front_desk
            })
            .then(response => {
                setTextAlert(response?.data.message)
                setTypeAlert(true)

                user && localStorage.setItem("actAssitant", user?.id)
                localStorage.setItem("actCounter", counter)

                navigate("/employee")
            })
            .catch(err => {
                setTextAlert(err?.response?.data.message)
                setTypeAlert(false)
            })
        }
    }

    return (
        <Fragment>
            <div className="counter_container">
                <SubTitle title="Balcões com servicos"/>
                <div className="choice">
                    {
                        listCounter?.length != 0 ?
                        listCounter?.map((each, i) => (
                            <div key={i}
                                className="each_choice"
                                onClick={() => saveSelectCounter(each.id_counter)}
                            >
                                <p>Balcão {each.ref}</p>
                            </div>
                        )) :
                        <div className="info">
                            <span>Nenhum balcão ativo</span>
                            <Link to={"/sign-in"}>Ir para o login</Link>
                        </div>
                    }
                </div>
            </div>
            {
                textAlert &&
                <Alert text={textAlert} type={typeAlert}/>
            }
        </Fragment>
    );
}
 
export default Counter;