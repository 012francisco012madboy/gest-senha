import { BsPen, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";
import { Fragment } from "react/jsx-runtime";
import CreateService from "./create-service";

const ListService = () => {
    return (
        <Fragment>
            <CreateService/>
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
                            <tr key={0}>
                                <td>0</td>
                                <td>Depósito</td>
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
 
export default ListService;