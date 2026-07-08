import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ListEmp = () => {
    const { actCompany, setShowModal, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { getListUser, listUser } = useContext(GlobalContext)

    const [_, setEmployeeSelected] = useState("")

    useEffect(() => {
        actCompany && getListUser(actCompany)
    }, [getListUser, actCompany])

    function handleUpdateEmployee(id: string) {
        setEmployeeSelected(id)
        id && setShowModal("update-employee")
    }

    function destroyEmployee(id: string) {
        Api.put(`user-destroy/${id}`)
            .then((response) => {
                setTextAlert(response?.data.message)
                setTypeAlert(true)

                actCompany && getListUser(actCompany)
            })
            .catch(err => {
                setTextAlert(err?.response?.data.message)
                setTypeAlert(false)
            })
    }

    return (
        <Fragment>
            {/* <CreateEmployee/>
            <UpdateEmployee employee={employeeSelected}/> */}
            <div className="w-full h-full flex flex-col gap-4 sm:gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl text-brand-secondary">Funcionários</h2>
                    <Button type="button" variant="primary">
                        <Plus/> Adicionar
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Permissões</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                                listUser?.map((each, i) => (
                                <TableRow key={i}>
                                    <TableCell>{each.id}</TableCell>
                                    <TableCell>{each.name}</TableCell>
                                    <TableCell>{each.email}</TableCell>
                                    <TableCell>{each.type}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <MoreHorizontal className="text-companion" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleUpdateEmployee(each.id)}>
                                                                Editar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem variant="destructive" onClick={() => destroyEmployee(each.id)}>
                                                                Eliminar
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </Fragment>
    );
}

export default ListEmp;