import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { GlobalContext } from "../../context/global-context";
import { IDefault } from "../../interface/IDefault";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ListCounter = () => {
    const { setShowModal, actCompany, setTextAlert, setTypeAlert } = useContext(AuthContext)
    const { listCounter, getListCounter } = useContext(GlobalContext)

    const [_, setCounterSelected] = useState<IDefault>({ id: "", name: "" })

    useEffect(() => {
        actCompany && getListCounter(actCompany)
    }, [getListCounter, actCompany])

    function handleAddCounterService(id: string, counter: string) {
        setCounterSelected({ id: id, name: counter })
        id && counter && setShowModal("add-counter-service")
    }

    function handleUpdateCounter(id: string, counter: string) {
        setCounterSelected({ id: id, name: counter })
        id && setShowModal("update-counter")
    }

    function destroyCounter(counterSelected: string) {
        Api.put(`/counter-destroy/${counterSelected}`)
            .then((response) => {
                actCompany && getListCounter(actCompany)
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
            {/* <CreateCounter />
            <AddCounterService counter={counterSelected} />
            <UpdateCounter counter={counterSelected} /> */}
            <div className="w-full h-full flex flex-col gap-4 sm:gap-8 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl text-brand-secondary">Balcões</h2>
                    <Button type="button" variant="primary">
                        <Plus /> Adicionar
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Referência</TableHead>
                            <TableHead>Serviço</TableHead>
                            <TableHead>Funcionário</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            listCounter?.map((each, i) => (
                                <TableRow key={i}>
                                    <TableCell>{each.id_counter}</TableCell>
                                    <TableCell>{each.ref}</TableCell>
                                    <TableCell>{each.id_service ? each.service : '-'}</TableCell>
                                    <TableCell>{each.id_user ? each.user : '-'}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreHorizontal className="text-companion" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleAddCounterService(each.id_counter, each.ref)}>
                                                    Add serviço
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleUpdateCounter(each.id_counter, each.ref)}>
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive" onClick={() => destroyCounter(each.id_counter)}>
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