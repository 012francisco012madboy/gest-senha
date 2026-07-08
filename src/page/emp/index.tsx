import Nav from "../../shared/emp/nav";
import Center from "../../shared/emp/center";
import Footer from "../../shared/emp/footer";

const Emp = () => {
    return (
        <div className="w-full h-dvh flex flex-col gap-4 justify-between overflow-hidden">
            <Nav />
            <Center />
            <Footer />
        </div>
    );
}

export default Emp;