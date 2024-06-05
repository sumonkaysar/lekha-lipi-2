import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { server } from "../../../../links";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const EditMyBlog = ({ blog }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const closeBtnRef = useRef(null);

    const token = Cookies.get("lekhaLipiToken");
    const { _id, title, description, category } = blog || {}
    
    const handleUpdateBlog = data => {
        const updatedData = {
            ...data
        }
        axios.patch(`${server}/blogs/${_id}`, updatedData)
            .then(({ data }) => {
                toast.success("Blog is updated successfully");
                reset();
                closeBtnRef.current.click()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`${server}/categories`)
            .then(({ data }) => {
                setCategories(data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <dialog id={`editMyBlogModal${_id}`} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button ref={closeBtnRef} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <form onSubmit={handleSubmit(handleUpdateBlog)}>
                    <div className="form-control mt-5">
                        <label htmlFor="name" className="text-sm mb-1 font-bold">Title</label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            id="title"
                            placeholder="Title"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                            defaultValue={title}
                        />
                        {errors.title && (
                            <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                Title is required
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-5">
                        <label className="text-sm mb-1 font-bold">Category</label>
                        {
                            categories.length > 0 &&
                            <select
                                {...register("category", { required: true })}
                                id="category"
                                className="select select-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                            >
                                {
                                    categories.map(cat => <option selected={cat.title === category} key={cat._id}>{cat.title}</option>)
                                }
                            </select>
                        }
                        {errors.category && (
                            <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                Category is required
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-5">
                        <label className="text-sm mb-1 font-bold">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            placeholder="Description"
                            className="textarea textarea-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none leading-5"
                            rows={6}
                            defaultValue={description}
                        ></textarea>
                        {errors.description && (
                            <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                Description is required
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-8">
                        <input
                            type="submit"
                            value="Update"
                            placeholder="Image"
                            className="btn bg-[#064e89] text-white py-3 h-fit min-h-fit text-[14px] rounded-[4px] hover:bg-[#0572ca] uppercase"
                        />
                    </div>
                </form>
            </div>
        </dialog>
    )
};

export default EditMyBlog