import { Outlet } from "react-router-dom";
import Navber from "../Components/Navber";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
    return (
        
        <div className="max-w-7xl mx-auto">
            <ToastContainer />
            
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;