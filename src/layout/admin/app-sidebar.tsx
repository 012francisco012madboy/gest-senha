import { Button } from "../../components/ui/button"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../../components/ui/sidebar"
import { Link } from "react-router"
import { Separator } from "../../components/ui/separator"
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"

export function AppSidebar() {
    const { isMobile, toggleSidebar } = useSidebar()

    const { logout } = useContext(AuthContext)

    return (
        <Sidebar>
            <SidebarHeader className="w-64 h-16 flex flex-row items-center justify-between bg-brand">
                <h1 className="text-xl font-bold text-white">GEST - SENHAS</h1>
            </SidebarHeader>
            <div className="w-full px-4">
                <Separator />
            </div>
            <SidebarContent className="no-scrollbar">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className={location.pathname === "/admin" ? "bg-brand/25" : undefined} asChild>
                                <Link to="/admin" onClick={isMobile ? toggleSidebar : undefined}>
                                    Dashboard
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className={location.pathname === "/admin/list-employee" ? "bg-brand/25" : undefined} asChild>
                                <Link to="/admin/list-employee" onClick={isMobile ? toggleSidebar : undefined}>
                                    Usuários
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className={location.pathname === "/admin/list-service" ? "bg-brand/25" : undefined} asChild>
                                <Link to="/admin/list-service" onClick={isMobile ? toggleSidebar : undefined}>
                                    Serviços
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className={location.pathname === "/admin/list-counter" ? "bg-brand/25" : undefined} asChild>
                                <Link to="/admin/list-counter" onClick={isMobile ? toggleSidebar : undefined}>
                                    Balcões
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" className={location.pathname === "/admin/list-associate" ? "bg-brand/25" : undefined} asChild>
                                <Link to="/admin/list-associate" onClick={isMobile ? toggleSidebar : undefined}>
                                    Associados
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <div className="w-full px-4">
                <Separator />
            </div>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Button variant="destructive" className="w-full justify-start px-4" onClick={logout}>
                            Sair
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}