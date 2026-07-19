import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";

const DashBoard = () => {
    const { count, getCount } = useContext(GlobalContext)

    useEffect(() => {
        getCount()
    }, [getCount])

    return (
        <div className="w-full grid grid-cols-1  sm:grid-cols-2 gap-4">
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{count?.users ?? 0}</ItemTitle>
                <ItemDescription className="font-bold">Funcionários</ItemDescription>
            </Item>
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{count?.services ?? 0}</ItemTitle>
                <ItemDescription className="font-bold">Serviços</ItemDescription>
            </Item>
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{count?.counters ?? 0}</ItemTitle>
                <ItemDescription className="font-bold">Balcões</ItemDescription>
            </Item>
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{count?.tickets ?? 0}</ItemTitle>
                <ItemDescription className="font-bold">Ticket</ItemDescription>
            </Item>
        </div>
    );
}

export default DashBoard;