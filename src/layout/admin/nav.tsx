import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Initials } from "@/components/initials";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    return (
            <nav className="min-h-16 h-16 flex items-center justify-between px-4 bg-brand">
                <div className="flex md:hidden items-center gap-4">
                    <SidebarTrigger className="w-auto text-white hover:text-white"/>
                    <h1 className="text-xl font-bold text-white">GEST - SENHAS</h1>
                </div>
                <div className="md:w-full h-full flex items-center md:justify-end gap-2 sm:gap-4">
                    <p className="text-white">Administrador</p>
                    <div className="h-full py-4">
                        <Separator orientation='vertical' />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-transparent border-none p-0 w-fit h-fit">
                            <Avatar>
                                <AvatarFallback className="font-bold">{Initials(user?.name)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem variant='default' onClick={() => navigate("/counter")}>
                                Balcões
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
    );
}
 
export default Nav;