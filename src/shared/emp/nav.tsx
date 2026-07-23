import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Initials } from "@/components/initials";
import { GlobalContext } from "@/context/global-context";

const Nav = () => {
    const { user, logout } = useContext(AuthContext)
    const { counterOpen } = useContext(GlobalContext)

    return (
        <nav className="min-h-16 h-16 flex items-center justify-between px-4 bg-brand">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">UTANGA SENHA</h1>
            </div>
            <div className="h-full flex items-center gap-2 sm:gap-4">
                {
                    counterOpen &&
                    <Fragment>
                        <Button size="sm" type='button' variant="secondary" className='px-4 font-bold'>
                            Balcão {counterOpen.reference}
                        </Button>
                        <div className="h-full py-4">
                            <Separator orientation='vertical' />
                        </div>
                    </Fragment>
                }
                <DropdownMenu>
                    <DropdownMenuTrigger className="bg-transparent border-none p-0 w-fit h-fit">
                        <Avatar>
                            <AvatarFallback className="font-bold">{Initials(user?.name)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem variant='destructive' onClick={logout}>
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