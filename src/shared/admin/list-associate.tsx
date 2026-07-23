import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import authApi from "../../server/api";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAlert } from "@/provider/alert";
import axios from "axios";
import { toast } from "sonner";
import AddAssociateModal from "@/components/modal/add-associate-modal";
import { SubTitle } from "@/components/title";

const ListAssociate = () => {
    const { listAssociate, getListAssociate } = useContext(GlobalContext)

    const { FailedAlert } = useAlert()

    const [openAddAssociate, setOpenAddAssociate] = useState(false)

    useEffect(() => {
        getListAssociate()
    }, [getListAssociate])

    async function destroyAssociate(id: string) {
        if (id == "") {
            return FailedAlert("Nenhuma associação selecionada")
        }

        try {
            toast.promise(authApi.delete(`counter/service/${id}`),
                {
                    loading: "Desassociando",
                    success: (res) => {
                        getListAssociate()
                        return res?.data.message
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
            {openAddAssociate && <AddAssociateModal open={openAddAssociate} setOpen={setOpenAddAssociate} />}
            <div className="w-full h-full flex flex-col gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <SubTitle title="Associados"/>
                    <Button type="button" variant="primary" onClick={() => setOpenAddAssociate(true)}>
                        <Plus /> Adicionar
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Balcão</TableHead>
                            <TableHead>Serviço</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            listAssociate?.map((each, i) => (
                                <TableRow key={i}>
                                    <TableCell>{each.reference}</TableCell>
                                    <TableCell>{each.service}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreHorizontal className="text-companion" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem variant="destructive" onClick={() => destroyAssociate(each.id)}>
                                                    Desassociar
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

export default ListAssociate;