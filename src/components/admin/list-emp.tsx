import { BsPen, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";
import { Fragment } from "react";
import CreateEmployee from "./create-employee";

const ListEmp = () => {
    return (
        <Fragment>
            <CreateEmployee/>
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
                            <tr key={0}>
                                <td>0</td>
                                <td>Ariel Francisco</td>
                                <td>arielfrancisco690@gmail.com</td>
                                <td>Funcionário</td>
                                <td>
                                    <div className="btn">
                                        <i><BsPen/></i>
                                        <i><BsXCircle/></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}
 
export default ListEmp;