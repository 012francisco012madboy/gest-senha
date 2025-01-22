import "../../css/emp.css"

import Nav from "../../components/emp/nav";
import Center from "../../components/emp/center";
import Footer from "../../components/emp/footer";

const Emp = () => {
    return (
        <div className="emp_container">
            <Nav/>
            <Center/>
            <Footer/>
        </div>
    );
}
 
export default Emp;