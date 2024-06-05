import TotalCard from "./TotalCard";
import { FaBlog, FaBloggerB, FaUser, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "../../../../links";
import useAuth from "../../../hooks/useAuth";

const DashboardCounts = () => {
    const { user } = useAuth()
    const { data: { data: dashboardData = {} } = {} } = useQuery({
        queryKey: ['dashboardData', user?.email],
        queryFn: () => axios.get(`${server}/users/${user?.email}/dashboard`)
    })

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 mb-10 gap-5">
            <TotalCard
                info={{
                    color: "text-yellow-500",
                    bg1: "bg-yellow-50",
                    bg2: "bg-yellow-200",
                    name: "My Blogs",
                    value: dashboardData.myBlogs
                }}
                Icon={FaUser}
            />
            <TotalCard
                info={{
                    color: "text-green-500",
                    bg1: "bg-green-50",
                    bg2: "bg-green-200",
                    name: "Total Blogs",
                    value: dashboardData.totalBlogs
                }}
                Icon={FaGear}
            />
            <TotalCard
                info={{
                    color: "text-rose-500",
                    bg1: "bg-rose-50",
                    bg2: "bg-rose-200",
                    name: "Total Categories",
                    value: dashboardData.totalCategories
                }}
                Icon={BiCategoryAlt}
            />
            <TotalCard
                info={{
                    color: "text-blue-500",
                    bg1: "bg-blue-50",
                    bg2: "bg-blue-200",
                    name: "Total Users",
                    value: dashboardData.totalUsers
                }}
                Icon={FaUsers}
            />
            <TotalCard
                info={{
                    color: "text-violet-500",
                    bg1: "bg-violet-50",
                    bg2: "bg-violet-200",
                    name: "Popular Blogs",
                    value: dashboardData.popularBlogs
                }}
                Icon={FaBlog}
            />
            <TotalCard
                info={{
                    color: "text-yellow-500",
                    bg1: "bg-yellow-50",
                    bg2: "bg-yellow-200",
                    name: "Adventured Blogs",
                    value: dashboardData.adventuredBlogs
                }}
                Icon={FaBloggerB}
            />
        </div>
    )
};

export default DashboardCounts