import "../../css/view.css"

import ActView from "../../components/view/act-view";
import ListView from "../../components/view/listView";
import Footer from "../../components/view/footer";

const View = () => {
    return (
        <div className="w-full h-dvh flex flex-col gap-4 sm:gap-8 justify-between overflow-hidden">
            <ActView/>
            <ListView/>
            <Footer/>
        </div>
    );
}
 
export default View;