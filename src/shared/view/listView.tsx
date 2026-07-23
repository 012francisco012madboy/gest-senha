import { useContext, useEffect } from "react";
import { Title } from "../../components/title";
import { GlobalContext } from "../../context/global-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import ApiEcho from "@/server/echo";

const ListView = () => {
    const { listTicket, getListTicket } = useContext(GlobalContext)

    useEffect(() => {
        getListTicket()

        const channel = ApiEcho.channel("ticket-created")
        
        channel.listen("ticket_created", () => {
            getListTicket();
        });

        return () => {
            ApiEcho.leave("ticket-created");
        };
    }, [getListTicket])

    return (
        <div className="w-full h-full flex flex-col gap-8 px-4 overflow-x-auto">
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