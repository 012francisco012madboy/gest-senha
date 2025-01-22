import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Init from "../page/init";
import Login from "../page/init/login";
import Counter from "../page/init/counter";
import View from "../page/view";
import Emp from "../page/emp";
import Client from "../page/client";
import Admin from "../page/admin";
import Render from "../render/default";
import DashBoard from "../components/admin/dashboard";
import ListEmp from "../components/admin/list-emp";
import ListService from "../components/admin/list-service";
import ListCounter from "../components/admin/list-counter";
import ListSession from "../components/admin/list-session";


const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Init/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/counter' element={<Counter/>}/>
                <Route path='/view' element={<View/>}/>
                <Route path='/employee' element={<Emp/>}/>
                <Route path='/client' element={<Client/>}/>

                <Route path="/admin" element={<Render/>}>
                    <Route path="" element={<Admin children={<DashBoard/>}/>}/>
                    <Route path="list-employee" element={<Admin children={<ListEmp/>}/>}/>
                    <Route path="list-service" element={<Admin children={<ListService/>}/>}/>
                    <Route path="list-counter" element={<Admin children={<ListCounter/>}/>}/>
                    <Route path="list-session" element={<Admin children={<ListSession/>}/>}/>
                </Route>
            </Routes>
        </Router>
     );
}
 
export default Rotas;