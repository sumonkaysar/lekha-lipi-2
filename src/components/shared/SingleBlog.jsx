import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPencil, FaTag } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SingleBlog = ({ blog }) => {
    const { _id, img, title, category, author, createdTime } = blog || {}

    return (
        <Link to={`/blogs/${_id}`} className="block relative">
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
        </Link>
    )
};

export default SingleBlog