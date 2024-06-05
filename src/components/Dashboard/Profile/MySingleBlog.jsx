import moment from "moment";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditMyBlog from "./EditMyBlog";

const MySingleBlog = ({ blog }) => {
    const { _id, img, title, category, createdTime } = blog || {}

    return (
        <div to={``} className="relative border-b-2 border-slate-400 pb-6  shadow-xl">
            <div className="w-full h-80 overflow-hidden rounded-t-3xl relative">
                <img className="w-full h-full object-cover" src={img} alt="" />
            </div>
            <div className="absolute bg-slate-100 top-6 -left-3 px-6 py-1 italic flex items-center gap-1 shadow-xl">
                <FaTag />
                <span>{category}</span>
            </div>
            <div className="flex items-center gap-1 text-[#888] italic mt-3 px-3">
                <FaCalendarAlt />
                <span>{moment(createdTime).format("Do MMM, YYYY")}</span>
            </div>
            <h3 className="font-semibold uppercase text-xl mt-3 px-3">{title}</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-4 px-3">
                <Link to={`/blogs/${_id}`} className="btn btn-sm bg-[#064e89] text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px] hover:bg-[#0572ca]">See Details</Link>
                <button onClick={() => document.getElementById('editMyBlogModal').showModal()} className="btn btn-warning btn-sm text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px]">Edit</button>
                <button className="btn btn-sm btn-error text-white py-2 h-fit min-h-fit text-[14px] rounded-[4px]">Delete</button>
            </div>
            <EditMyBlog blog={blog} />
        </div>
    )
};

export default MySingleBlog