import Nav from "./nav";
import { ReactNode, useContext } from "react";
import { GlobalContext } from "@/context/global-context";
import FileSelected from "./file-selected";
import FolderSelected from "./folder-selected";

interface layoutProps {
    children: ReactNode
}

const UserLayout = ({ children }: layoutProps) => {
    const {fileId, folderId} = useContext(GlobalContext)

    return (
        <div className="min-h-screen flex flex-col font-sans text-brand bg-slate-50">
            <Nav />
            <div className="flex-1 flex flex-col p-4! sm:p-8! mx-auto w-full">
                {
                    children
                }
            </div>
            {fileId && <FileSelected />}
            {folderId && <FolderSelected />}
        </div>
    );
}

export default UserLayout;