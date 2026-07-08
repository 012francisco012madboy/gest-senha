import { useContext, useEffect } from "react";
import { Title } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import ApiEcho from "@/server/echo";

const ListView = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListAllTicket, listAllTicket } = useContext(GlobalContext)

    useEffect(() => {
        actCompany && getListAllTicket(actCompany)
    }, [actCompany, getListAllTicket])

    useEffect(() => {
        if (!actCompany) return

        // carga inicial
        getListAllTicket(actCompany)

        const channel = ApiEcho.channel(`tickets`)
        
        channel.listen("TicketCreated", () => {

            // Atualiza a lista chamando sua API
            getListAllTicket(actCompany);

        });

        return () => {
            ApiEcho.leave("tickets");
        };
    }, [actCompany, getListAllTicket])

    return (
        <div className="w-full h-full flex flex-col gap-4 px-4 overflow-x-auto">
            <Title title="Senhas em espera" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Senha</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Balcão</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        listAllTicket &&
                        listAllTicket?.map((each, i) => (
                            <TableRow key={i}>
                                <TableCell>{each.ref}</TableCell>
                                <TableCell>{each.service}</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default ListView;