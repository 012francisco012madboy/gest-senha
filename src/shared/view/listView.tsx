import { useContext, useEffect } from "react";
import { Title } from "../../components/title";
import { GlobalContext } from "../../context/global-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import ApiEcho from "@/server/echo";

const ListView = () => {
    const { listTicket, getListTicket } = useContext(GlobalContext)

    useEffect(() => {
        getListTicket()
    }, [getListTicket])

    useEffect(() => {
        getListTicket()

        const channel = ApiEcho.channel(`tickets`)
        
        channel.listen("TicketCreated", () => {
            getListTicket();
        });

        return () => {
            ApiEcho.leave("tickets");
        };
    }, [getListTicket])

    return (
        <div className="w-full h-full flex flex-col gap-4 px-4 overflow-x-auto">
            <Title title="Senhas em espera" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Senha</TableHead>
                        <TableHead>Serviço</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        listTicket &&
                        listTicket?.map((each, i) => (
                            <TableRow key={i}>
                                <TableCell>{each.reference}</TableCell>
                                <TableCell>{each.service}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default ListView;