import { BsPen, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";
import { Fragment } from "react/jsx-runtime";
import CreateService from "./create-service";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import UpdateService from "./update-service";
import { Api } from "../../server/api";
import { Question } from "../other/alert";

const ListService = () => {
    const { actCompany, setShowModal, setTextQuestion, textQuestion, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { listService, getListService } = useContext(GlobalContext)

    useEffect(() => {
        actCompany && getListService(actCompany)
    }, [getListService, actCompany])

    const [ serviceSelected, setServiceSelected ] = useState("")

    function handleUpdateService(id: string){
        setServiceSelected(id)
        id && setShowModal("update-service")
    }
    
    function destroyService(){
        Api.put(`/service-destroy/${serviceSelected}`)
        .then((response) => {
            actCompany && getListService(actCompany)
            setTextAlert(response?.data.message)
            setTypeAlert(true)
        })
        .catch((erro) => {
            setTextAlert(erro?.response.data.message)
            setTypeAlert(false)
        })
    }

    function validateQuestion(id: string){
        setServiceSelected(id)
        setTextQuestion("Desejas elimnar este serviço?")
    }

    return (
        <Fragment>
            <CreateService/>
            <UpdateService service={serviceSelected}/>
            <div className="table-container">
                <Button modal="create-service"/>
                <div className="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listService?.map((each, i) => (
                                    <tr key={i}>
                                        <td>{each.id}</td>
                                        <td>{each.name}</td>
                                        <td>
                                            <div className="btn">
                                                <i onClick={() => handleUpdateService(each.id)}><BsPen/></i>
                                                <i onClick={() => validateQuestion(each.id)}><BsXCircle/></i>
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
                textQuestion &&
                <Question text={textQuestion} validate={destroyService}/>
            }
        </Fragment>
    );
}
 
export default ListService;