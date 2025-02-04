import "../../css/alert.css"
import { useContext, useEffect, useState } from "react";
import { PiCheckCircleBold, PiQuestion, PiXCircleBold } from "react-icons/pi";
import { AuthContext } from "../../context/auth-context";

interface alertProps{
    text: string
    type: boolean
}

interface questionProps{
    text: string
    validate: () => void
}

export function Alert({text, type} :  alertProps){
    const { setTextAlert } = useContext(AuthContext)
    const [ show, setShow ] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)

            setTextAlert("")
        }, 2000);

        return () => clearTimeout(timer);
    })

    return ( 
        <div className={show == true ? "alert-container active" : "alert-container"}>
            <div className={type == true ? "alert-content success" : "alert-content failed"}>
                <div className="alert-icon">
                    <i>
                        {
                            type == true ?
                            <PiCheckCircleBold/>:
                            <PiXCircleBold/>
                        }
                    </i>
                </div>
                <div className="alert-text">
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

export function Question({text, validate} :  questionProps){
    const { setTextQuestion } = useContext(AuthContext)
    const [show, setShow] = useState<boolean>(true)

    function cancelQuestion(){
        setShow(false)
        setTextQuestion("")
    }

    function validateQuestion(){
        validate()
        setShow(false)
        setTextQuestion("")
    }

    return ( 
        <div className={show == true ? "question-container active" : "question-container"}>
            <div className={"question-content response"}>
                <div className="question-icon">
                    <i>
                        <PiQuestion/>
                    </i>
                </div>
                <div className="question-text">
                    <p>{text}</p>
                </div>
                <div className="question-response">
                    <strong onClick={validateQuestion}>Sim</strong>
                    <strong onClick={cancelQuestion}>Não</strong>
                </div>
            </div>
        </div>
    );
}