import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
};

export default MainLayout