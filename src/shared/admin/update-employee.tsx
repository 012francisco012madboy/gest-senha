import { Fragment, useContext, useEffect, useState } from "react";
import { PiXCircleBold } from "react-icons/pi";
import { Load, SubTitle } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { GlobalContext } from "../../context/global-context";
import { IUser } from "../../interface/IUser";
import { BsLock } from "react-icons/bs";
import { Question } from "../other/alert";

interface employeeProps{
    employee: string
}

const UpdateEmployee = ({employee} : employeeProps) => {
    const { actCompany, showModal, setShowModal, textQuestion, setTextQuestion, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListUser, getEachUser } = useContext(GlobalContext)
    
    const [ eachUser, setEachUser ] = useState<IUser | null>()
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ id_type, setIdType ] = useState("-1")

    useEffect(() => {
        getEachUser(employee, setEachUser)
    }, [getEachUser, employee, setEachUser])

    useEffect(() => {
        eachUser && setName(eachUser.name)
        eachUser && setEmail(eachUser.email)
        eachUser && setIdType(eachUser.id_type)
    }, [eachUser])

    function setData(){
        setName("")
        setEmail("")
        setIdType("-1")
    }

    const [ btnDisabled, setBtnDisabled ] = useState(false)

    function updateEmployee(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(name && email && id_type != "-1"){
            setBtnDisabled(true)

            Api.put(`user-update/${eachUser?.id}`, {
                name,
                email,
                id_type
            })
            .then((response) => {
                setTextAlert(response?.data.message)
                setTypeAlert(true)

                setBtnDisabled(false)

                setName("")
                setEmail("")
                setIdType("-1")
                
                setShowModal(null)
                actCompany && getListUser(actCompany)
            })
            .catch(err => {
                setTextAlert(err?.response?.data.message)
                setTypeAlert(false)

                setBtnDisabled(false)
            })
        }
    }
    
    function resetPassword(){
        Api.put(`user-reset/${eachUser?.id}`)
        .then((response) => {
            setTextAlert(response?.data.message)
            setTypeAlert(true)

            actCompany && getListUser(actCompany)
                
            setShowModal(null)
        })
        .catch(err => {
            setTextAlert(err?.response?.data.message)
            setTypeAlert(false)
        })
    }

    function validateQuestion(){
        setTextQuestion("Desejas redefinir a senha deste funcionáro?")
    }

    return (
        <Fragment>
            <div className={showModal == "update-employee" ? "overlay-container active" : "overlay-container"}>
                <form className="overlay-content" onSubmit={(e) => updateEmployee(e)}>
                    <div className="each-title">
                        <SubTitle title="Atualizar um funcionário"/>
                        <i onClick={() => {setShowModal(null), setData()}}><PiXCircleBold/></i>
                    </div>
                    <div className="each-input">
                        <label htmlFor="">Nome do funcionário</label>
                        <input
                            required
                            type="text"
                            defaultValue={eachUser?.name}
                            placeholder="John Doe"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="each-input">
                        <label htmlFor="">Email do funcionário</label>
                        <input
                            required
                            type="email"
                            defaultValue={eachUser?.email}
                            placeholder="johndoe@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="each-input">
                        <label htmlFor="">Permissões</label>
                        <select onChange={(e) => setIdType(e.target.value)} defaultValue={eachUser?.id_type}>
                            <option style={{color: "red"}} value={eachUser?.id_type}>{eachUser?.type}*</option>
                            <option value="1">Administrador</option>
                            <option value="2">Funcionário</option>
                        </select>
                    </div>
                    <div className="each-input">
                        <label
                            style={{fontSize: "10pt", cursor: "pointer", color: "red"}}
                            onClick={validateQuestion}
                        >
                            <BsLock/> Refinir senha
                        </label>
                    </div>
                    <div className="each-button">
                        <button disabled={btnDisabled} type="submit">{btnDisabled ? <Load/> : "Salvar"}</button>
                    </div>
                </form>
            </div>
            {
                textQuestion && showModal == "update-employee" &&
                <Question text={textQuestion} validate={resetPassword}/>
            }
        </Fragment>
    );
}
 
export default UpdateEmployee;