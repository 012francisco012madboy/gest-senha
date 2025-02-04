import { BsPen, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";
import { Fragment, useContext, useEffect, useState } from "react";
import CreateEmployee from "./create-employee";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import UpdateEmployee from "./update-employee";
import { Question } from "../other/alert";
import { Api } from "../../server/api";

const ListEmp = () => {
    const { actCompany, showModal, setShowModal, textQuestion, setTextAlert, setTextQuestion, setTypeAlert } = useContext(AuthContext)
    const { getListUser, listUser } = useContext(GlobalContext)

    const [ employeeSelected, setEmployeeSelected ] = useState("")

    useEffect(() => {
        actCompany && getListUser(actCompany)
    }, [getListUser, actCompany])

    function handleUpdateEmployee(id: string){
        setEmployeeSelected(id)
        id && setShowModal("update-employee")
    }
    
    function destroyEmployee(){
        Api.put(`user-destroy/${employeeSelected}`)
        .then((response) => {
            setTextAlert(response?.data.message)
            setTypeAlert(true)

            actCompany && getListUser(actCompany)
        })
        .catch(err => {
            setTextAlert(err?.response?.data.message)
            setTypeAlert(false)
        })
    }

    function validateQuestion(id: string){
        setEmployeeSelected(id)
        setTextQuestion("Desejas eliminar este funcionário?")
    }

    return (
        <Fragment>
            <CreateEmployee/>
            <UpdateEmployee employee={employeeSelected}/>
            <div className="table-container">
                <Button modal="create-employee"/>
                <div className="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Permissões</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUser?.map((each, i) => (
                                    <tr key={i}>
                                        <td>{each.id}</td>
                                        <td>{each.name}</td>
                                        <td>{each.email}</td>
                                        <td>{each.type}</td>
                                        <td>
                                            <div className="btn">
                                                <i title="Editar"
                                                    onClick={() => handleUpdateEmployee(each.id)}
                                                >
                                                    <BsPen/>
                                                </i>
                                                <i  title="Remover"
                                                    onClick={() => validateQuestion(each.id)}
                                                >
                                                    <BsXCircle/>
                                                </i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                textQuestion && showModal == null &&
                <Question text={textQuestion} validate={destroyEmployee}/>
            }
        </Fragment>
    );
}
 
export default ListEmp;