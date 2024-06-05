import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { GoogleAuthProvider } from "firebase/auth";
import account from "../assets/account.svg";
import logo from "../assets/lekha-lipi-white.svg";
import { Link, useNavigate } from "react-router-dom";
import { GithubAuthProvider } from "firebase/auth/web-extension";
import { server } from "../../links";
import Cookies from "js-cookie";

const Login = () => {
    const { login, providerLogin } = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [loginError, setLoginError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleProviderLogin = provider => {
        providerLogin(provider)
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user
                const joinedTime = (new Date()).getTime();
                axios.post(`${server}/users/provider`, { uid, name: displayName, email, img: photoURL, joinedTime })
                    .then(({ data }) => {
                        Cookies.set('lekhaLipiToken', data.token, { expires: 7, path: '/' });
                    })
                    .catch(err => console.error(err));
                navigate('/');
            })
            .catch(err => console.error(err));
    }

    const handleLogin = data => {
        setLoginError("");
        login(data.email, data.password)
            .then(result => {
                axios.post(`${server}/users/provider`, { email: data.email })
                    .then(info => {
                        console.log(info);
                        Cookies.set('lekhaLipiToken', info.token, { expires: 7, path: '/' });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.error(err);
                switch (err.message.split("auth/")[1].split(")")[0]) {
                    case "invalid-credential":
                        setLoginError("Email or password is incorrect");
                        break;

                    case "too-many-requests":
                        setLoginError(err.message.split("(auth/")[0].split(": ")[1]);
                        break;

                    default:
                        setLoginError(err.message);
                        break;
                }
            });
    };

    return (
        <div className="flex h-screen">
            <div className="w-[550px] p-16 justify-center items-center text-[#064e89] hidden lg:flex">
                <div>
                    <h4 className="text-xl font-bold text-[23px]">Log in to continue to LekhaLipi</h4>
                    <p className="py-6 font-light text-[18px]">Please enter your credentials to access your account.</p>
                    <div>
                        <img className="w-full max-w-96" src={account} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-[#064e89] flex-1">
                <div className="flex justify-center items-center h-full w-full">
                    <div>
                        <form onSubmit={handleSubmit(handleLogin)} className="w-64 xl:w-80">
                            <Link to="/" className="flex max-w-[150px] mb-10">
                                <img src={logo} alt="LekhaLipi" />
                            </Link>
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
                            <div className="form-control relative mt-3">
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
                            {loginError && (
                                <p className="text-[#ff2525] text-[14px] mt-2 font-semibold text-center">
                                    {loginError}
                                </p>
                            )}
                            <div className="mt-4">
                                <button className="btn px-8 py-2 h-fit min-h-fit text-[14px] rounded-sm text-[#064e89]">Login</button>
                            </div>
                        </form>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-white text-[12px] font-light">Or login with</span>
                            <FaGoogle onClick={() => handleProviderLogin(googleProvider)} className="text-white cursor-pointer" />
                            <FaGithub onClick={() => handleProviderLogin(githubProvider)} className="text-white cursor-pointer" />
                        </div>
                        <div className="mt-4 text-white text-[14px] font-light">
                            <p>Don't have an account? <Link className="font-medium text-[#ffde00] hover:underline" to="/signup">Signup Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login