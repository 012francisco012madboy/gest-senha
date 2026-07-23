import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Nav from "./nav";

interface layoutProps {
    children: ReactNode
}

const AdminLayout = ({ children }: layoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full min-h-dvh grid grid-cols-1 md:grid-cols-[16rem_1fr] overflow-hidden bg-sidebar">
                <AppSidebar />
                <main className="w-full h-dvh flex flex-col md:gap-4 justify-between overflow-hidden">
                    <Nav />
                    <div className="w-full h-full p-4 md:p-8 md:rounded-tl-2xl bg-white">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}

export default AdminLayout;