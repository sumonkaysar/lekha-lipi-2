import { Link } from "react-router-dom";
import logo from "../../assets/lekha-lipi.svg";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();

    const menuItems = <>
        <li>
            <Link to="/">Home</Link>
        </li>
    </>;

    return (
        <nav className="navbar bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="max-w-[150px]">
                    <img src={logo} alt="LekhaLipi" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.uid ? <>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </> : <>
                        <Link to="/login" className="btn btn-sm bg-[#064e89] text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px] border-[#064e89] hover:border-[#0572ca] hover:bg-[#0572ca]">Login</Link>
                        <Link to="/signup" className="btn btn-outline btn-sm text-[#064e89] hover:bg-[#064e89] hover:border-[#064e89] py-2 h-fit min-h-fit text-[14px] rounded-[4px] ml-2">Signup</Link>
                    </>
                }
            </div>
        </nav>
    )
};

export default Navbar