import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import ApiEcho from "@/server/echo";

const ActView = () => {
    const { getLastTicket, lastTicket } = useContext(GlobalContext)

    useEffect(() => {
        getLastTicket()

        const channel = ApiEcho.channel("ticket-called")
        
        channel.listen("ticket_called", () => {
            getLastTicket();
        });

        return () => {
            ApiEcho.leave("ticket-called");
        };
    }, [getLastTicket])

    return (
        <div className="w-full min-h-48 h-48 grid grid-cols-2 border-b border-input">
            <div className="w-full flex flex-col items-center justify-center text-white bg-brand-secondary">
                <p className="text-2xl">Senha</p>
                <strong className="text-4xl">{lastTicket?.reference ?? '?'}</strong>
            </div>
            <div className="w-full flex flex-col items-center justify-center text-brand-secondary">
                <p className="text-2xl">Balcão</p>
                <strong className="text-4xl">{lastTicket?.counter ?? '?'}</strong>
            </div>
        </div>
    );
}

export default ActView;