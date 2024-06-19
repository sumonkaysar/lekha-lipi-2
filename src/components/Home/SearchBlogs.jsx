import axios from "axios";
import { server } from "../../../links";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const SearchBlogs = () => {
    const [items, setItems] = useState([]);
    const { authHeader } = useAuth();
    const handleSearch = e => {
        const title = e.target.value.trim()
        if (title) {
            axios.get(`${server}/blogs/search?title=${title}`, authHeader)
                .then(({ data }) => {
                    setItems(data)
                })
                .catch(err => console.log(err))
        } else {
            setItems([])
        }
    }

    return (
        <div className="my-20">
            <h1 className="text-center font-semibold sm:text-3xl uppercase relative before:absolute before:w-14 before:h-[3px] before:bg-[#064e89] before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:content-['']">
                <span>Search </span>
                <span className="text-[#064e89]">Blogs</span>
            </h1>
            <div className="form-control mt-10 sm:w-[500px] mx-auto">
                <input onKeyUp={handleSearch} type="text" placeholder="Search" className="input input-bordered border-gray-700 placeholder:text-gray-500 w-full" />
            </div>
            {
                items?.length > 0 &&
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 mt-4 md:mt-5 xl:mt-8">
                    {
                        items?.map(blog => <Link to={`/blogs/${blog._id}`} key={blog._id}>
                            <div className="h-40 overflow-hidden rounded-t-xl">
                                <img className="w-full h-full object-cover" src={blog.img} alt="" />
                                </div>
                            <h2>{blog.title}</h2>
                        </Link>)
                    }
                </div>
            }
        </div>
    )
};

export default SearchBlogs