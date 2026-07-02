import { Routes, Route} from "react-router-dom";
import Init from "../page/init";
import SignIn from "../page/init/sign-in";
import Counter from "../page/init/counter";
import View from "../page/view";
import Emp from "../page/emp";
import Client from "../page/client";
import Admin from "../page/admin";
import Render from "../render/default";
import DashBoard from "../shared/admin/dashboard";
import ListEmp from "../shared/admin/list-emp";
import ListService from "../shared/admin/list-service";
import ListCounter from "../shared/admin/list-counter";
import ListSession from "../shared/admin/list-session";
import SignUpComp from "../page/init/sign-up-comp";
import SignUpEmp from "../page/init/sign-up-emp";
import { Fragment, ReactNode, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Alert } from "../shared/other/alert";

interface itemProps{
    children: ReactNode
    permited: string[]
}

function PrivateRoute({children, permited}: itemProps){
    const { logado, user } = useContext(AuthContext)

    if(!logado){
        return (
            <Fragment>
                <SignIn/>
            </Fragment>
        )
    }
     
    if(user?.id_type && !permited.includes(String(user.id_type))){
         return (
            <Fragment>
                <SignIn/>
                <Alert text="Permissão recusada" type={false}/>
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
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up-company' element={<SignUpComp/>}/>
            <Route path='/sign-up-employee' element={<SignUpEmp/>}/>

            <Route path='/' element={<Init/>}/>
            <Route path='/view' element={<View/>}/>
            <Route path='/client' element={<Client/>}/>
            
            <Route path="" element={<PrivateRoute children={<Render/>} permited={["1", "2"]}/>}>
                <Route path='/counter' element={<Counter/>}/>
                <Route path='/employee' element={<Emp/>}/>
            </Route>

            <Route path="/admin" element={<PrivateRoute children={<Render/>} permited={["1"]}/>}>
                <Route path="" element={<Admin children={<DashBoard/>}/>}/>
                <Route path="list-employee" element={<Admin children={<ListEmp/>}/>}/>
                <Route path="list-service" element={<Admin children={<ListService/>}/>}/>
                <Route path="list-counter" element={<Admin children={<ListCounter/>}/>}/>
                <Route path="list-session" element={<Admin children={<ListSession/>}/>}/>
            </Route>
        </Routes>
     );
}
 
export default Rotas;