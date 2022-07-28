import React, { useState } from 'react';
import { useRouter } from "next/router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Teacherlogin = ({createToken}) => {
    // state varriable of input field
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // handle submit on clicking register button
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherlogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            let postData = await res.json();
            console.log(postData)
            if (postData.success) {
                toast.success('Login Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem("token",JSON.stringify(postData.token));
                setTimeout(() => {
                    router.push("/");
                },2000)
            }
            else {
                toast.error('Invalid Credential', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setEmail("")
            setPassword("")
        }
        catch (err) {
            console.log(err);
            toast.error('Internal server error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    // handle change of input field
    const handleInput = (e) => {
        const { value } = e.target;
        if (e.target.name == "email") {
            setEmail(value);
        }
        else if (e.target.name == "password") {
            setPassword(value);
        }
    }
    return (
        <>
            <div style={{
                marginTop: "75px",
            }}
                className="container w-full mx-auto h-[calc(100%-75px)]">
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
                <div className="flex w-full justify-center px-6 my-10">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center items-center">
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Login Your Account!</h3>
                            <form onSubmit={handleSubmit} method="POST" className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        onChange={handleInput}
                                        value={email}
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        onChange={handleInput}
                                        value={password}
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="pasword"
                                        type="password"
                                        placeholder="password"
                                    />
                                </div>
                                <div className="mb-6 text-center mt-4">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Login
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Teacherlogin