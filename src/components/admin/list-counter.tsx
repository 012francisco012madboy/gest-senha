import { BsPen, BsPlusCircle, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";
import { Fragment } from "react/jsx-runtime";
import CreateCounter from "./create-counter";
import AddCounterService from "./add-counter-service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { IDefault } from "../../interface/IDefault";
import UpdateCounter from "./update-counter";
import { Api } from "../../server/api";
import { Question } from "../other/alert";

const ListCounter = () => {
    const { showModal, setShowModal, actCompany, textQuestion, setTextQuestion, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { listCounter, getListCounter } = useContext(GlobalContext)

    const [ counterSelected, setCounterSelected ] = useState<IDefault>({id: "", name: ""})

    useEffect(() => {
        actCompany && getListCounter(actCompany)
    }, [getListCounter, actCompany])

    function handleAddCounterService(id: string, counter: string){
        setCounterSelected({id: id, name: counter})
        id && counter && setShowModal("add-counter-service")
    }

    function handleUpdateCounter(id: string, counter: string){
        setCounterSelected({id: id, name: counter})
        id && setShowModal("update-counter")
    }
    
    function destroyCounter(){
        Api.put(`/counter-destroy/${counterSelected.id}`)
        .then((response) => {
            actCompany && getListCounter(actCompany)
            setTextAlert(response?.data.message)
            setTypeAlert(true)
        })
        .catch((erro) => {
            setTextAlert(erro?.response.data.message)
            setTypeAlert(false)
        })
    }

    function validateQuestion(id: string, name: string){
        setTextQuestion("Desejas eliminar este balcão?")

        setCounterSelected({id: id, name: name})
    }

    return (
        <Fragment>
            <CreateCounter/>
            <AddCounterService counter={counterSelected}/>
            <UpdateCounter counter={counterSelected}/>
            <div className="table-container">
                <Button modal="create-counter"/>
                <div className="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Referência</th>
                                <th>Serviço</th>
                                <th>Funcionário</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listCounter?.map((each, i) => (
                                    <tr key={i}>
                                        <td>{each.id_counter}</td>
                                        <td>{each.ref}</td>
                                        <td>{each.id_service ? each.service : '-'}</td>
                                        <td>{each.id_user ? each.user : '-'}</td>
                                        <td>
                                            <div className="btn">
                                                <i onClick={() => handleAddCounterService(each.id_counter, each.ref)}><BsPlusCircle/></i>
                                                <i onClick={() => handleUpdateCounter(each.id_counter, each.ref)}><BsPen/></i>
                                                <i onClick={() => validateQuestion(each.id_counter, each.ref)}><BsXCircle/></i>
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
                <Question text={textQuestion} validate={destroyCounter}/>
            }
        </Fragment>
    );
}
 
export default ListCounter;