import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { ITicket } from "../../interface/ITicket";

const ActView = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListLastTicket } = useContext(GlobalContext)

    const [ticket, setTicket] = useState<ITicket>()

    // const [acc, setAcc] = useState<boolean>()

    useEffect(() => {
        actCompany && getListLastTicket(actCompany, setTicket)
    }, [actCompany, getListLastTicket, setTicket])

    /* useEffect(() => {
        setInterval(() => {
            if (acc) return;
            setAcc(true)
            actCompany && getListLastTicket(actCompany, setTicket)
            setAcc(false)
        }, 10000)
    }, [actCompany, getListLastTicket, setTicket]) */

    return (
        <div className="w-full min-h-48 h-48 grid grid-cols-2 border-b border-input">
            <div className="w-full flex flex-col items-center justify-center gap-4 bg-brand">
                <p className="text-2xl">Senha</p>
                <strong className="text-4xl">{ticket?.ref ?? '?'}</strong>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4 text-brand">
                <p className="text-2xl ">Balcão</p>
                <strong className="text-4xl">{ticket?.counter ?? '?'}</strong>
            </div>
        </div>
    );
}

export default ActView;