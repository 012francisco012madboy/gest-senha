import Nav from "../../shared/emp/nav";
import Center from "../../shared/emp/center";
import Footer from "../../shared/emp/footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";
import { GlobalContext } from "@/context/global-context";

const Emp = () => {
    const { user } = useContext(AuthContext)
    const { getCounterOpen } = useContext(GlobalContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(user && !user?.current_counter){
            navigate("/counter")
        }
        else{
            getCounterOpen()
        }
    }, [user, getCounterOpen])

    return (
        <div className="w-full h-dvh flex flex-col gap-4 justify-between overflow-hidden">
            <Nav />
            <Center />
            <Footer />
        </div>
    );
}

export default Emp;