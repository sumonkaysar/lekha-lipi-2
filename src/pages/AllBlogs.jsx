import SingleBlog from "../components/shared/SingleBlog";
import useBlogs from "../hooks/useBlogs";

const AllBlogs = () => {
    const { blogs } = useBlogs();

    return (
        <div className="mb-20 mt-10 w-11/12 max-w-[1440px] mx-auto">
            <h1 className="text-center font-semibold sm:text-3xl uppercase relative before:absolute before:w-14 before:h-[3px] before:bg-[#064e89] before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:content-['']">
                <span>All </span>
                <span className="text-[#064e89]">Blogs</span>
            </h1>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-12 xl:gap-10 mt-16">
                {
                    blogs?.map(blog => <SingleBlog
                        key={blog._id}
                        blog={blog}
                    />)
                }
            </div>
        </div>
    )
};

export default AllBlogs