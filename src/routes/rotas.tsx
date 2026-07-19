import { Routes, Route} from "react-router-dom";
import Init from "../page/init";
import SignIn from "../page/init/sign-in";
import Counter from "../page/init/counter";
import View from "../page/view";
import Emp from "../page/emp";
import Client from "../page/client";
import Render from "../render/default";
import DashBoard from "../shared/admin/dashboard";
import ListEmp from "../shared/admin/list-emp";
import ListService from "../shared/admin/list-service";
import ListCounter from "../shared/admin/list-counter";
import { Fragment, ReactNode, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import AdminLayout from "@/layout/admin";
import Loading from "@/page/init/loading";
import ListAssociate from "@/shared/admin/list-associate";

interface itemProps{
    children: ReactNode
    permited: string[]
}

function PrivateRoute({children, permited}: itemProps){
    const { user, loading } = useContext(AuthContext)

    if(loading){
        return (
            <Fragment>
                <Loading/>
            </Fragment>
        )
    }

    if(!user){
        return (
            <Fragment>
                <SignIn/>
            </Fragment>
        )
    }
     
    if(user?.role && !permited.includes(String(user.role))){
         return (
            <Fragment>
                <SignIn/>
            </Fragment>
         )
    }
    
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

const Rotas = () => {
    return (
        <Routes>
            <Route path='*' element={<SignIn/>}/>

            <Route path='/sign-in' element={<SignIn/>}/>

            <Route path='/' element={<Init/>}/>
            <Route path='/view' element={<View/>}/>
            <Route path='/client' element={<Client/>}/>
            
            <Route path="" element={<PrivateRoute children={<Render/>} permited={["SU", "Admin", "Atendente"]}/>}>
                <Route path='/counter' element={<Counter/>}/>
                <Route path='/employee' element={<Emp/>}/>
            </Route>

            <Route path="/admin" element={<PrivateRoute children={<Render/>} permited={["SU", "Admin"]}/>}>
                <Route path="" element={<AdminLayout children={<DashBoard/>}/>}/>
                <Route path="list-employee" element={<AdminLayout children={<ListEmp/>}/>}/>
                <Route path="list-service" element={<AdminLayout children={<ListService/>}/>}/>
                <Route path="list-counter" element={<AdminLayout children={<ListCounter/>}/>}/>
                <Route path="list-associate" element={<AdminLayout children={<ListAssociate/>}/>}/>
            </Route>
        </Routes>
     );
}
 
export default Rotas;