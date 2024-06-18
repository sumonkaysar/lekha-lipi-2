import axios from "axios";
import { server } from "../../../links";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

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
        }
    }

    return (
        <div className="my-20">
            <h1 className="text-center font-semibold text-3xl uppercase relative before:absolute before:w-14 before:h-[3px] before:bg-[#064e89] before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:content-['']">
                <span>Search </span>
                <span className="text-[#064e89]">Blogs</span>
            </h1>
            <div className="form-control mt-10 w-[500px] mx-auto">
                <input onKeyUp={handleSearch} type="text" placeholder="Search" className="input input-bordered border-gray-700 placeholder:text-gray-500 w-full" />
            </div>
            {
                items?.length > 0 &&
                <div>
                    {
                        items?.map(blog => <div>
                            <div><img src={blog.img} alt="" /></div>
                            <h2>{blog.title}</h2>
                        </div>)
                    }
                </div>
            }
        </div>
    )
};

export default SearchBlogs