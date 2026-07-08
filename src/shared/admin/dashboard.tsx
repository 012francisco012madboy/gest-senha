import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global-context";
import { AuthContext } from "../../context/auth-context";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";

const DashBoard = () => {
    const { actCompany } = useContext(AuthContext)
    const { getCountUser, getCountTicket, getCountService, getCountCounter, countUser, countService, countCounter, countTicket } = useContext(GlobalContext)

    useEffect(() => {
        if (actCompany) {
            getCountUser(actCompany)
            getCountService(actCompany)
            getCountCounter(actCompany)
            getCountTicket(actCompany)
        }
    }, [])
    return (
        <div className="w-full grid grid-cols-1  sm:grid-cols-2 gap-4">
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{countUser}</ItemTitle>
                <ItemDescription>Funcionários</ItemDescription>
            </Item>
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{countService}</ItemTitle>
                <ItemDescription>Serviços</ItemDescription>
            </Item>
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{countCounter}</ItemTitle>
                <ItemDescription>Balcões</ItemDescription>
            </Item>
            <Item variant="outline" className="flex flex-col items-start p-4 gap-4">
                <ItemTitle>{countTicket}</ItemTitle>
                <ItemDescription>Ticket</ItemDescription>
            </Item>
        </div>
    );
}

export default DashBoard;