import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Title } from "../other/extra";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Sidebar = () => {
    const { actCompany, actUserAssistant } = useContext(AuthContext)
    const { getListTicket, listTicket } = useContext(GlobalContext)

    const [acc, setAcc] = useState<boolean>()

    useEffect(() => {
        actCompany && actUserAssistant && getListTicket(actUserAssistant?.id_service, actCompany)
    }, [actCompany, getListTicket, actUserAssistant])

    useEffect(() => {
        setInterval(() => {
            if (acc) return;
            setAcc(true)
            actCompany && actUserAssistant && getListTicket(actUserAssistant?.id_service, actCompany)
            setAcc(false)
        }, 10000)
    }, [actCompany, getListTicket, actUserAssistant])

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
                        listTicket &&
                        listTicket?.map((each, i) => (
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

export default Sidebar;