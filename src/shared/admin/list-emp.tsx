import { Fragment, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AddEmployeeModal from "@/components/modal/add-employee-modal";
import { useAlert } from "@/provider/alert";
import axios from "axios";
import EditEmployeeModal from "@/components/modal/edit-employee-modal";
import { IUser } from "@/interface/IUser";
import { toast } from "sonner";

const ListEmp = () => {
    const { actCompany } = useContext(AuthContext)
    const { getListUser, listUser } = useContext(GlobalContext)

    const { FailedAlert, SuccessAlert } = useAlert()

    const [employee, setEmployee] = useState<Omit<IUser, 'idType' | 'type' | 'id_state' | 'id_company'>>();

    const [openAddEmployee, setOpenAddEmployee] = useState(false)
    const [openEditEmployee, setOpenEditEmployee] = useState(false)

    useEffect(() => {
        actCompany && getListUser(actCompany)
    }, [getListUser, actCompany])

    function handleEditEmployee(each: Omit<IUser, 'idType' | 'type' | 'id_state' | 'id_company'>) {
        setEmployee(each);

        setOpenEditEmployee(true);
    }

    async function destroyEmployee(id: string) {
        if (id == "") {
            return FailedAlert("Nenhum funcionário selecionado")
        }

        try {
            toast.promise(Api.put(`user-destroy/${id}`),
                {
                    loading: "Eliminando",
                    success: (res) => {
                        SuccessAlert(res?.data.message)
                        actCompany && getListUser(actCompany)
                    },
                    error: (e) => e?.response?.data.message || "Erro inesperado"
                }
            )
        } catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
    }

    /* async function resetPassword(id: string) {
        try {
            const response = await Api.patch(`user-reset/${id}`)
            
            SuccessAlert(response?.data.message)

            actCompany && getListUser(actCompany)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
    } */

    return (
        <Fragment>
            <AddEmployeeModal open={openAddEmployee} setOpen={setOpenAddEmployee} />
            <EditEmployeeModal employee={employee} open={openEditEmployee} setOpen={setOpenEditEmployee} />
            <div className="w-full h-full flex flex-col gap-4 sm:gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl text-brand-secondary">Funcionários</h2>
                    <Button type="button" variant="primary" onClick={() => setOpenAddEmployee(true)}>
                        <Plus /> Adicionar
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
                                                <DropdownMenuItem onClick={() => handleEditEmployee(each)}>
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