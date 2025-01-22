import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const Render = () => {
     return (
          <Fragment>
               <Outlet/>
          </Fragment>
     );
}
 
export default Render;