import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { imgbbUrl, server } from "../../../links";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const token = Cookies.get("lekhaLipiToken");

    const handleAddBlog = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        axios.post(imgbbUrl, formData)
            .then(({ data: imgData }) => {
                if (imgData.success) {
                    const blog = {
                        ...data,
                        img: imgData.data.url,
                        author: { name: user.displayName, email: user.email },
                        createdTime: (new Date()).getTime()
                    }
                    axios.post(`${server}/blogs`, blog)
                        .then(({ data }) => {
                            toast.success("Blog is added successfully");
                            reset();
                            navigate("/dashboard/my-blogs");

                        })
                        .catch(err => console.log(err))
                }
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
        <div className="mb-20 mt-10 w-11/12 mx-auto">
            <h1 className="font-semibold text-3xl uppercase mb-6">
                <span>Add </span>
                <span className="text-[#064e89]">Blog</span>
            </h1>
            <form onSubmit={handleSubmit(handleAddBlog)}>
                <div className="form-control mt-5">
                    <label htmlFor="name" className="text-sm mb-1 font-bold">Title</label>
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        id="title"
                        placeholder="Title"
                        className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
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
                                categories.map(category => <option key={category._id}>{category.title}</option>)
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
                    <label className="text-sm mb-1 font-bold">Image</label>
                    <input
                        {...register("img", { required: true })}
                        type="file"
                        placeholder="Image"
                        className="file-input file-input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                    />
                    {errors.img && (
                        <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                            Image is required
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
                        value="Add"
                        placeholder="Image"
                        className="btn bg-[#064e89] text-white py-3 h-fit min-h-fit text-[14px] rounded-[4px] hover:bg-[#0572ca] uppercase"
                    />
                </div>
            </form>
        </div>
    )
};

export default AddBlog