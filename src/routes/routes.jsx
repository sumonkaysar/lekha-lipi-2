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
                path: "/blog-details",
                element: <BlogDetails />,
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
        element: <DashboardLayout />,
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