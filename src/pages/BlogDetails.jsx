import axios from "axios";
import { server } from "../../links";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaPencil } from "react-icons/fa6";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import moment from "moment";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: { data: blogDetails = {} } = {} } = useQuery({
        queryKey: ['blogDetails', id],
        queryFn: () => axios.get(`${server}/blogs/${id}`)
    })
    const { img, title, category, author, createdTime, description } = blogDetails || {}

    return (
        <div className="w-11/12 max-w-[1440px] mx-auto">
            <div className="block relative my-16">
                <div className="w-full h-80 overflow-hidden rounded-t-3xl relative">
                    <img className="w-full h-full object-cover" src={img} alt="" />
                    <div className="flex items-center gap-1 text-[#4e4e4e] italic mt-1 absolute bottom-0 bg-[#c9c9c9] w-full justify-center py-1">
                        <FaPencil />
                        <span>by {author?.name}</span>
                    </div>
                </div>
                <div className="absolute bg-slate-100 top-6 -left-3 px-6 py-1 italic flex items-center gap-1 shadow-xl">
                    <FaTag />
                    <span>{category}</span>
                </div>
                <div className="flex items-center gap-1 text-[#888] italic mt-3">
                    <FaCalendarAlt />
                    <span>{moment(createdTime).format("Do MMM, YYYY")}</span>
                </div>
                <h3 className="font-semibold uppercase text-xl mt-3">{title}</h3>
                <p className="text-gray-600 mt-3">{description}</p>
            </div>
        </div>
    )
};

export default BlogDetails