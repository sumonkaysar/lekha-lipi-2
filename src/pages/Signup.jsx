import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import account from "../assets/account.svg";
import logo from "../assets/lekha-lipi-white.svg";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../links";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const Signup = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [signupError, setSignupError] = useState("");
    const { createUser, updateUser, providerLogin } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleProviderSignup = provider => {
        providerLogin(provider)
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user
                const joinedTime = (new Date()).getTime();
                saveUserToDB({ uid, name: displayName, email, img: photoURL, joinedTime }, "provider");
            })
            .catch(err => console.error(err));
    }

    const handleSignup = data => {
        setSignupError("");
        if (data.password !== data.confirmPassword) {
            return setSignupError("Passwords didn't match");
        }

        createUser(data.email, data.password)
            .then(result => {
                updateUser({ displayName: data.name })
                    .then(() => {
                        console.log("Account Created");
                        const joinedTime = (new Date()).getTime();
                        saveUserToDB({
                            uid: result.user.uid,
                            name: data.name,
                            email: data.email,
                            joinedTime,
                        }, "")
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(err => {
                console.log(err);
                switch (err.message.split("auth/")[1].split(")")[0]) {
                    case "email-already-in-use":
                        setSignupError("The user is already registered");
                        break;
                    case "weak-password":
                        setSignupError(err.message.split("(auth/")[0].split(": ")[1]);
                        break;
                    case "invalid-email":
                        setSignupError("Enter a valid email");
                        break;
                    case "too-many-requests":
                        setSignupError(err.message.split("(auth/")[0].split(": ")[1]);
                        break;
                    default:
                        setSignupError(err.message)
                        break;
                }
            })
    };

    const saveUserToDB = (user, url) => {
        axios.post(`${server}/users/${url}`, user)
            .then(data => {
                Cookies.set('lekhaLipiToken', data.token, { expires: 7, path: '/' });
                navigate('/');
            })
            .catch(err => console.error(err));
    }

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
                                {errors.confirmPassword && (
                                    <p className="text-[#ff2525] text-[14px] mt-1 font-semibold">
                                        Confirm password is required
                                    </p>
                                )}
                            </div>
                            {signupError && (
                                <p className="text-[#ff2525] text-[14px] mt-2 font-semibold text-center">
                                    {signupError}
                                </p>
                            )}
                            <div className="mt-4">
                                <button className="btn px-8 py-2 h-fit min-h-fit text-[14px] rounded-sm text-[#064e89]">Signup</button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-white text-[12px] font-light">Or signup with</span>
                            <FaGoogle onClick={() => handleProviderSignup(googleProvider)} className="text-white cursor-pointer" />
                            <FaGithub onClick={() => handleProviderSignup(githubProvider)} className="text-white cursor-pointer" />
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