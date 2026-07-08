import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ListService = () => {
    const { actCompany, setShowModal, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { listService, getListService } = useContext(GlobalContext)

    useEffect(() => {
        actCompany && getListService(actCompany)
    }, [getListService, actCompany])

    const [_, setServiceSelected] = useState("")

    function handleUpdateService(id: string) {
        setServiceSelected(id)
        id && setShowModal("update-service")
    }

    function destroyService(id: string) {
        Api.put(`/service-destroy/${id}`)
            .then((response) => {
                actCompany && getListService(actCompany)
                setTextAlert(response?.data.message)
                setTypeAlert(true)
            })
            .catch((erro) => {
                setTextAlert(erro?.response.data.message)
                setTypeAlert(false)
            })
    }

    return (
        <Fragment>
            {/* <CreateService/>
            <UpdateService service={serviceSelected}/> */}
            <div className="w-full h-full flex flex-col gap-4 sm:gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl text-brand-secondary">Serviços</h2>
                    <Button type="button" variant="primary">
                        <Plus /> Adicionar
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            listService?.map((each, i) => (
                                <TableRow key={i}>
                                    <TableCell>{each.id}</TableCell>
                                    <TableCell>{each.name}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreHorizontal className="text-companion" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleUpdateService(each.id)}>
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive" onClick={() => destroyService(each.id)}>
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

export default ListService;