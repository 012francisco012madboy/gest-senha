import "../../css/init.css"
import { Link } from "react-router-dom";

import { HiComputerDesktop } from "react-icons/hi2";
import { FiUser  } from "react-icons/fi";
import { RiFileList2Line } from "react-icons/ri";

const Init = () => {
    return (
        <div className="init_container">
            <div className="choice">
                <Link to={"/view"}>
                    <div className="each_choice">
                        <p><i><HiComputerDesktop/> </i>Tela</p>
                    </div>
                </Link>
                <Link to={"/client"}>
                    <div className="each_choice">
                        <p><i><RiFileList2Line /> </i>Cliente</p>
                    </div>
                </Link>
                <Link to={"/sign-in"}>
                    <div className="each_choice">
                        <p><i><FiUser /> </i>Funcionário</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default Init;