import "../../css/view.css"

import ActView from "../../components/view/act-view";
import ListView from "../../components/view/listView";
import Footer from "../../components/view/footer";

const View = () => {
    return (
        <div className="view_container">
            <ActView/>
            <ListView/>
            <Footer/>
        </div>
    );
}
 
export default View;