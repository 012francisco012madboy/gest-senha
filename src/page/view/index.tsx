import ActView from "../../shared/view/act-view";
import ListView from "../../shared/view/listView";
import Footer from "../../shared/view/footer";

const View = () => {
    return (
        <div className="w-full h-dvh flex flex-col gap-8 sm:gap-16 justify-between overflow-hidden">
            <ActView/>
            <ListView/>
            <Footer/>
        </div>
    );
}
 
export default View;