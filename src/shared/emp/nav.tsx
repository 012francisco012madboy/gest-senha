import { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { Api } from "../../server/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Initials } from "@/components/initials";

const Nav = () => {
    const { getUserAssistant, actUserAssistant, logout } = useContext(AuthContext)

    useEffect(() => {
        getUserAssistant()
    }, [])

    async function handleLogout() {
        await Api.put(`user-assistant-remove/${actUserAssistant?.id_assistant}`)
        logout()
    }

    return (
        <nav className="min-h-16 h-16 flex items-center justify-between px-4 bg-brand">
            <div className="flex items-center gap-2">
                <h1 className="text-xl">GEST - SENHAS</h1>
            </div>
            <div className="flex items-center gap-2">
                {
                    actUserAssistant?.ref_counter &&
                    <Fragment>
                        <Button type='button' variant="secondary" className='px-4 font-bold'>
                            Balcão {actUserAssistant?.ref_counter}
                        </Button>
                        <Separator orientation='vertical' />
                    </Fragment>
                }
                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent border-none p-0 w-fit h-fit">
                        <Avatar size='lg'>
                            <AvatarFallback className="font-bold">{Initials(actUserAssistant?.name_user)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem variant='destructive' onClick={handleLogout}>
                            <LogOut className="text-lg" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}

export default Nav;