import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Monitor, UserRound } from 'lucide-react';
import { Pattern } from "@/components/pattern";

const Init = () => {
    const navigate = useNavigate()

    return (
        <Pattern>
            <div className="w-full flex flex-col items-center justify-center gap-4 z-10">
                <Button className="max-w-40 w-full" type="button" variant="primary" onClick={() => navigate("/view")}>
                    <Monitor /> Tela
                </Button>
                <Button className="max-w-40 w-full" type="button" variant="primary" onClick={() => navigate("/client")}>
                    <FileText /> Senhas
                </Button>
                <Button className="max-w-40 w-full" type="button" variant="primary" onClick={() => navigate("/sign-in")}>
                    <UserRound /> Funcionário
                </Button>
            </div>
        </Pattern>
    );
}

export default Init;