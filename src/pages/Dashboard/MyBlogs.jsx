import axios from "axios";
import { server } from "../../../links";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import MySingleBlog from "../../components/Dashboard/MyBlogs/MySingleBlog";

const MyBlogs = () => {
    const { user, authHeader } = useAuth();
    const { data: { data: blogs = [] } = {}, refetch } = useQuery({
        queryKey: ['my-blogs'],
        queryFn: () => axios.get(`${server}/blogs/my/${user.email}`, authHeader)
    })

    return (
        <div className="mb-20 mt-10 w-11/12 mx-auto">
            <h1 className="font-semibold text-3xl uppercase pt-5 lg:pt-0">
                <span>My </span>
                <span className="text-[#064e89]">Blogs</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-6 gap-y-12 xl:gap-10 mt-6">
                {
                    blogs?.map(blog => <MySingleBlog
                        key={blog._id}
                        blog={blog}
                        refetch={refetch}
                    />)
                }
            </div>
        </div>
    )
};

export default MyBlogs