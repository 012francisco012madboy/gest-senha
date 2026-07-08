import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAlert } from "@/provider/alert";
import axios from "axios";
import { toast } from "sonner";
import AddServiceModal from "@/components/modal/add-service-modal";
import { IDefault } from "@/interface/IDefault";
import EditServiceModal from "@/components/modal/edit-service-modal";

const ListService = () => {
    const { actCompany } = useContext(AuthContext)
    const { listService, getListService } = useContext(GlobalContext)

    const { FailedAlert, SuccessAlert } = useAlert()

    const [service, setService] = useState<IDefault>()

    const [openAddService, setOpenAddService] = useState(false)
    const [openEditService, setOpenEditService] = useState(false)

    useEffect(() => {
        actCompany && getListService(actCompany)
    }, [getListService, actCompany])

    function handleEditService(each: IDefault) {
        setService(each);

        setOpenEditService(true);
    }

    async function destroyService(id: string) {
        if (id == "") {
            return FailedAlert("Nenhum serviço selecionado")
        }

        try {
            toast.promise(Api.put(`/service-destroy/${id}`),
                {
                    loading: "Eliminando",
                    success: (res) => {
                        SuccessAlert(res?.data.message)
                        actCompany && getListService(actCompany)
                    },
                    error: (e) => e?.response?.data.message || "Erro inesperado"
                }
            )
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                FailedAlert(e?.response?.data.message || "Erro inesperado")
            }
            else {
                FailedAlert("Erro inesperado")
            }
        }
    }

    return (
        <Fragment>
            <AddServiceModal open={openAddService} setOpen={setOpenAddService} />
            <EditServiceModal service={service} open={openEditService} setOpen={setOpenEditService} />
            <div className="w-full h-full flex flex-col gap-4 sm:gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl text-brand-secondary">Serviços</h2>
                    <Button type="button" variant="primary" onClick={() => setOpenAddService(true)}>
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
                                                <DropdownMenuItem onClick={() => handleEditService(each)}>
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