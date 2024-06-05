import { useContext } from "react";
import { BlogsContext } from "../contexts/BlogsProvider";

const useBlogs = () => {
    const blogs = useContext(BlogsContext);
    return blogs;
};

export default useBlogs;