import useBlogs from "../../hooks/useBlogs";
import SingleBlog from "../shared/SingleBlog";

const RecentPosts = () => {
    const { recentBlogs } = useBlogs();

    return (
        <div className="my-20">
            <h1 className="text-center font-semibold text-3xl uppercase relative before:absolute before:w-14 before:h-[3px] before:bg-[#064e89] before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:content-['']">
                <span>Recent </span>
                <span className="text-[#064e89]">Posts</span>
            </h1>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-12 xl:gap-10 mt-16">
                {
                    recentBlogs?.map(blog => <SingleBlog
                        key={blog._id}
                        blog={blog}
                    />)
                }
            </div>
        </div>
    )
};

export default RecentPosts