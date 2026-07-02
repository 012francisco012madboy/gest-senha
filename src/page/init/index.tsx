import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Monitor, UserRound } from 'lucide-react';

const Init = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full h-dvh flex items-center justify-center bg-white">
            <div className="flex flex-col gap-4">
                <Button type="button" variant="primary" onClick={() => navigate("/view")}>
                    <Monitor/> Tela
                </Button>
                <Button type="button" variant="primary" onClick={() => navigate("/client")}>
                    <FileText/> Senhas
                </Button>
                <Button type="button" variant="primary" onClick={() => navigate("/sign-in")}>
                    <UserRound/> Funcionário
                </Button>
            </div>
        </div>
    );
}
 
export default Init;