import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import authApi from "../../server/api";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAlert } from "@/provider/alert";
import axios from "axios";
import AddCounterModal from "@/components/modal/add-counter-modal";
import EditCounterModal from "@/components/modal/edit-counter-modal";
import { ICounter } from "@/interface/ICounter";
import { SubTitle } from "@/components/title";

const ListCounter = () => {
    const { listCounter, getListCounter } = useContext(GlobalContext)
    const { FailedAlert, SuccessAlert } = useAlert()

    const [counter, setCounter] = useState<ICounter>()

    const [openAddCounter, setOpenAddCounter] = useState(false)
    const [openEditCounter, setOpenEditCounter] = useState(false)

    useEffect(() => {
        getListCounter()
    }, [getListCounter])

    function handleEditCounter(each: ICounter) {
        setCounter(each);

        setOpenEditCounter(true);
    }

    async function destroyCounter(id: string) {
        try {
            const response = await authApi.delete(`counter/${id}`)

            SuccessAlert(response?.data.message)

            getListCounter()
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
            {openAddCounter && <AddCounterModal open={openAddCounter} setOpen={setOpenAddCounter} />}
            {openEditCounter && <EditCounterModal counter={counter} open={openEditCounter} setOpen={setOpenEditCounter} />}
            <div className="w-full h-full flex flex-col gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <SubTitle title="Balcões" />
                    <Button type="button" variant="primary" onClick={() => setOpenAddCounter(true)}>
                        <Plus /> Adicionar
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Referência</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            listCounter?.map((each, i) => (
                                <TableRow key={i}>
                                    <TableCell>{each.reference}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreHorizontal className="text-companion" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleEditCounter(each)}>
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive" onClick={() => destroyCounter(each.id)}>
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

export default ListCounter;