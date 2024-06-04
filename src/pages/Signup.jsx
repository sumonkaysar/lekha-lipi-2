import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import account from "../assets/account.svg";
import logo from "../assets/lekha-lipi-white.svg";
import { Link } from "react-router-dom";

const Signup = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [signupError, setSignupError] = useState("");
    const { createUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignup = data => {
        setSignupError("");
        if (data.password !== data.confirmPassword) {
            return setSignupError("Passwords didn't match");
        }

        createUser(data.email, data.password)
            .then(result => {
                // axios.post("http://localhost:5000/users", data)
                // .then(result => {
                console.log(result);
                // })
                // .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="flex h-screen">
            <div className="w-[550px] p-16 justify-center items-center text-[#064e89] hidden lg:flex">
                <div>
                    <h4 className="text-xl font-bold text-[23px]">Join LekhaLipi</h4>
                    <p className="py-6 font-light text-[18px]">Create your account to start blogging today!</p>
                    <div>
                        <img className="w-full max-w-96" src={account} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-[#064e89] flex-1">
                <div className="flex justify-center items-center h-full w-full">
                    <div>
                        <form onSubmit={handleSubmit(handleSignup)} className="w-64 xl:w-80">
                            <Link to="/" className="flex max-w-[150px] mb-10">
                                <img src={logo} alt="LekhaLipi" />
                            </Link>
                            <div className="form-control">
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    placeholder="Name"
                                    className="input input-sm rounded-sm text-[15px] placeholder:text-[15px]"
                                />
                                {errors.name && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Name is required
                                    </p>
                                )}
                            </div>
                            <div className="form-control mt-2">
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    placeholder="Email"
                                    className="input input-sm rounded-sm text-[15px] placeholder:text-[15px]"
                                />
                                {errors.email && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Email is required
                                    </p>
                                )}
                            </div>
                            <div className="form-control relative mt-2">
                                <input
                                    {...register("password", { required: true })}
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-sm rounded-sm text-[15px] placeholder:text-[15px]"
                                />
                                <div className="absolute top-[10px] right-3 cursor-pointer">
                                    {
                                        passwordShown ?
                                            <FaEyeSlash onClick={() => setPasswordShown(false)} /> :
                                            <FaEye onClick={() => setPasswordShown(true)} />
                                    }
                                </div>
                                {errors.password && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Password is required
                                    </p>
                                )}
                            </div>
                            <div className="form-control relative mt-2">
                                <input
                                    {...register("confirmPassword", { required: true })}
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="input input-sm rounded-sm text-[15px] placeholder:text-[15px]"
                                />
                                {errors.password && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Confirm password is required
                                    </p>
                                )}
                            </div>
                            {signupError && (
                                <p className="text-[#ff2525] text-[14px] mt-2 font-semibold text-center text-sm ">
                                    {signupError}
                                </p>
                            )}
                            <div className="mt-4">
                                <button className="btn px-8 py-2 h-fit min-h-fit text-[14px] rounded-sm text-[#064e89]">Signup</button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-white text-[12px] font-light">Or signup with</span>
                            <FaGoogle color="white" />
                            <FaGithub color="white" />
                            {/* <FaFacebook color="white" /> */}
                        </div>
                        <div className="mt-4 text-white text-[14px] font-light">
                            <p>Already have an account? <Link className="font-medium text-[#ffde00] hover:underline" to="/login">Login Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup