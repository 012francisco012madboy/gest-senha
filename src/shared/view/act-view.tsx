import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import ApiEcho from "@/server/echo";

const ActView = () => {
    const { getLastTicket, lastTicket } = useContext(GlobalContext)

    useEffect(() => {
        getLastTicket()

        const channel = ApiEcho.channel(`testes`)
        
        channel.listen("TicketCalled", () => {
            getLastTicket();
        });

        return () => {
            ApiEcho.leave("testes");
        };
    }, [getLastTicket])

    return (
        <div className="w-full min-h-48 h-48 grid grid-cols-2 border-b border-input">
            <div className="w-full flex flex-col items-center justify-center gap-4 text-white bg-brand">
                <p className="text-2xl">Senha</p>
                <strong className="text-4xl">{lastTicket?.reference ?? '?'}</strong>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4 text-brand">
                <p className="text-2xl ">Balcão</p>
                <strong className="text-4xl">{lastTicket?.counter ?? '?'}</strong>
            </div>
        </div>
    );
}

export default ActView;