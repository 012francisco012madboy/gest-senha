import { BsPen, BsXCircle } from "react-icons/bs";
import { Button } from "../other/extra";

const ListSession = () => {
    return (
        <div className="table-container">
            <Button modal="create-session"/>
            <div className="table-content">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Balcões</th>
                            <th>Senhas</th>
                            <th>Aberto aos</th>
                            <th>Fechado aos</th>
                            <th>Estado</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={0}>
                            <td>0</td>
                            <td>3</td>
                            <td>100</td>
                            <td>2025-11-01</td>
                            <td>2025-11-01</td>
                            <td>Fechado</td>
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
 
export default ListSession;