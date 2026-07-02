import { useContext, useEffect, useState } from "react";
import { Title } from "../other/extra";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const ListView = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListAllTicket, listAllTicket } = useContext(GlobalContext)

    // const [ acc, setAcc ] = useState<boolean>(false)

    useEffect(() => {
        actCompany && getListAllTicket(actCompany)
    }, [actCompany, getListAllTicket])

    /* useEffect(() => {
        setInterval(() => {
            if (acc) return;
            setAcc(true)
            actCompany && getListAllTicket(actCompany)
            setAcc(false)
        }, 10000)
    }, [actCompany, getListAllTicket]) */

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
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>xx</TableCell>
                                <TableCell>xx</TableCell>
                                <TableCell>Em espera</TableCell>
                            </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default ListView;