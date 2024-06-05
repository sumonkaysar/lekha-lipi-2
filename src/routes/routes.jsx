import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyBlogs from "../pages/Dashboard/MyBlogs";
import AddBlog from "../pages/Dashboard/AddBlog";
import AllBlogs from "../pages/AllBlogs";
import BlogDetails from "../pages/BlogDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/all-blogs",
                element: <AllBlogs />,
            },
            {
                path: "/blogs/:id",
                element: <PrivateRoute><BlogDetails /></PrivateRoute>,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "/dashboard/profile",
                element: <Profile />,
            },
            {
                path: "/dashboard/add-blog",
                element: <AddBlog />,
            },
            {
                path: "/dashboard/my-blogs",
                element: <MyBlogs />,
            },
        ]
    },
]);