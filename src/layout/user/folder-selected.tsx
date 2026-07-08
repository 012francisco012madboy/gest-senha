import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context/global-context";
import { Copy, Layers2, X } from "lucide-react";
import { useContext } from "react";

const FolderSelected = () => {
    const {folderCopy, folderMove, setFolderId} = useContext(GlobalContext)

    return (
        <div className="bg-white border-t border-input px-4! sm:px-8! py-4! flex items-center justify-between gap-2 sticky bottom-0 z-30">
            <div className="w-full flex flex-row flex-wrap items-center justify-between gap-4">
                <Button type="button" variant="ghost" className="sm:px-4!" onClick={() => setFolderId(undefined)}><X/> Cancelar</Button>
                <div className="flex-1 flex justify-end gap-4">
                    <Button type="button" variant="ghost" className="sm:px-4!" onClick={() => folderCopy()}><Copy/> Copiar</Button>
                    <Button type="button" variant="ghost" className="sm:px-4!" onClick={() =>folderMove()}><Layers2/> Mover</Button>
                </div>
            </div>
        </div>
    );
}

export default FolderSelected;