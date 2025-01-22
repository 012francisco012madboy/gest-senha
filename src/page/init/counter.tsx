import { Link } from "react-router-dom";

const Counter = () => {
    return (
        <div className="counter_container">
            <div className="choice">
                <Link to={"/employee"}>
                    <div className="each_choice">
                        <p>Balcão 1</p>
                    </div>
                </Link>
                <Link to={"/employee"}>
                    <div className="each_choice">
                        <p>Balcão 1</p>
                    </div>
                </Link>
                <Link to={"/employee"}>
                    <div className="each_choice">
                        <p>Balcão 1</p>
                    </div>
                </Link>
                <Link to={"/employee"}>
                    <div className="each_choice">
                        <p>Balcão 1</p>
                    </div>
                </Link>
                
            </div>
        </div>
    );
}
 
export default Counter;