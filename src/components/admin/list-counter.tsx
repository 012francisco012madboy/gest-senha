import { BsPen, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";

const ListCounter = () => {
    return (
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
                        <tr key={0}>
                            <td>0</td>
                            <td>A</td>
                            <td>Depósito</td>
                            <td>Ariel Francisco</td>
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
    );
}
 
export default ListCounter;