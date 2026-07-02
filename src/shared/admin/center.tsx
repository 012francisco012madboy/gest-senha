import { MdNotificationsActive } from "react-icons/md";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import Sidebar from "./sidebar";

const Center = () => {
    return (
        <div className="center">
            <div className="left">
                <Sidebar/>
            </div>
            <div className="right">
                <div className="act">
                    <strong>123</strong>
                    <p>Atendimento atual</p>
                </div>
                <div className="menu">
                    <div className="each_menu">
                        <p><i><MdNotificationsActive/></i> Chamar novamente</p>
                    </div>
                    <div className="each_menu">
                        <p><i><PiArrowBendUpLeftBold/></i> Voltar para fila</p>
                    </div>
                    <div className="each_menu">
                        <p><i><MdCheck/></i> Finalizar</p>
                    </div>
                    <div className="each_menu">
                        <p><i><MdClose/></i> Não compareceu</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Center;