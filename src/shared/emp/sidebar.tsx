import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import { Title } from "../../components/title";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ApiEcho from "@/server/echo";

const Sidebar = () => {
    const { getListCounterTicket, listCounterTicket } = useContext(GlobalContext)

    useEffect(() => {
        getListCounterTicket()

        const channel = ApiEcho.channel(`tickets`)
        
        channel.listen("TicketCreated", () => {
            getListCounterTicket();
        });

        return () => {
            ApiEcho.leave("tickets");
        };
    }, [getListCounterTicket])

    return (
        <div className="w-full h-full hidden md:flex flex-col gap-4 pr-4 border-r border-input overflow-x-auto">
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
                        listCounterTicket &&
                        listCounterTicket?.map((each, i) => (
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

export default Sidebar;