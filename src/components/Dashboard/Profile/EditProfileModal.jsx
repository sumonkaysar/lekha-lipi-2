import axios from "axios";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { server } from "../../../../links";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const EditProfileModal = ({ userData, refetch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { authHeader } = useAuth();
    const { img, name, email, mobile, occupation, location, website, facebook, instagram, github, linkedIn, twitter } = userData;
    const closeBtnRef = useRef(null);
    const [linkErrors, setLinkErrors] = useState({});

    const handleUpdateUser = data => {
        const updateInfo = {};
        setLinkErrors({});
        Object.keys(data).forEach(key => {
            if (data[key] && userData[key] !== data[key]) {
                updateInfo[key] = data[key]
            }
        });

        if (Object.keys(updateInfo).length > 0) {
            Object.keys(updateInfo).forEach(key => {
                if (updateInfo[key].includes("www") || updateInfo[key].includes("/")) {
                    setLinkErrors(prevErrors => ({ ...prevErrors, [key]: `${key} username cannot contain '/' or 'www'` }))
                }
            });

            axios.patch(`${server}/users/${email}`, updateInfo, authHeader)
                .then(({ data }) => {
                    if (data.modifiedCount > 0) {
                        refetch();
                        toast.success("Blog is added successfully");
                        closeBtnRef.current.click();
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <dialog id="editProfileModal" className="modal">
            <div className="modal-box bg-slate-200">
                <form onSubmit={handleSubmit(handleUpdateUser)}>
                    <div className="form-control mt-2">
                        <label htmlFor="name" className="text-sm mb-1">Name</label>
                        <input
                            {...register("name", { required: true })}
                            defaultValue={name}
                            type="text"
                            id="name"
                            placeholder="Name"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                        {errors.name && (
                            <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                Name is required
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Email</label>
                        <input
                            defaultValue={email}
                            type="email"
                            placeholder="Email"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                            disabled
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Mobile</label>
                        <input
                            {...register("mobile")}
                            defaultValue={mobile}
                            type="text"
                            placeholder="Mobile"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Location</label>
                        <input
                            {...register("location")}
                            defaultValue={location}
                            type="text"
                            placeholder="Location"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Occupation</label>
                        <input
                            {...register("occupation")}
                            defaultValue={occupation}
                            type="text"
                            placeholder="Occupation"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Website Link</label>
                        <input
                            {...register("website")}
                            defaultValue={website}
                            type="text"
                            placeholder="Website Link"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Facebook username</label>
                        <input
                            {...register("facebook")}
                            defaultValue={facebook}
                            type="text"
                            placeholder="Facebook username"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                        {
                            linkErrors?.facebook && <p className="text-error text-xs mt-1 font-bold first-letter:uppercase">{linkErrors?.facebook}</p>
                        }
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Instagram username</label>
                        <input
                            {...register("instagram")}
                            defaultValue={instagram}
                            type="text"
                            placeholder="Instagram username"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                        {
                            linkErrors?.instagram && <p className="text-error text-xs mt-1 font-bold first-letter:uppercase">{linkErrors?.instagram}</p>
                        }
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Github username</label>
                        <input
                            {...register("github")}
                            defaultValue={github}
                            type="text"
                            placeholder="Github username"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />
                        {
                            linkErrors?.github && <p className="text-error text-xs mt-1 font-bold first-letter:uppercase">{linkErrors?.github}</p>
                        }
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">LinkedIn username</label>
                        <input
                            {...register("linkedIn")}
                            defaultValue={linkedIn}
                            type="text"
                            placeholder="LinkedIn username"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />

                        {
                            linkErrors?.linkedIn && <p className="text-error text-xs mt-1 font-bold first-letter:uppercase">{linkErrors?.linkedIn}</p>
                        }
                    </div>
                    <div className="form-control mt-2">
                        <label className="text-sm mb-1">Twitter username</label>
                        <input
                            {...register("twitter")}
                            defaultValue={twitter}
                            type="text"
                            placeholder="Twitter username"
                            className="input input-sm rounded-sm text-[15px] placeholder:text-[15px] focus:outline-none"
                        />

                        {
                            linkErrors?.twitter && <p className="text-error text-xs mt-1 font-bold first-letter:uppercase">{linkErrors?.twitter}</p>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white ">Update</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        <button ref={closeBtnRef} className="btn p-2 h-fit min-h-fit rounded-full bg-slate-600 hover:bg-slate-500 text-white absolute right-2 top-2">
                            <FaTimes />
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
};

export default EditProfileModal