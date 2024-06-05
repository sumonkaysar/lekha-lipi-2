import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "../../links";
import { createContext } from "react";

export const BlogsContext = createContext(null);

const BlogsProvider = ({ children }) => {
    const { data: { data: blogData = {} } = {} } = useQuery({
        queryKey: ['blogData'],
        queryFn: () => axios.get(`${server}/blogs`)
    })

    return (
        <BlogsContext.Provider value={blogData}>{children}</BlogsContext.Provider>
    );
};

export default BlogsProvider;