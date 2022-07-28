import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getStorage } from "firebase/storage";


const Signup = () => {
    // state varriable of input field
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stream, setStream] = useState("");
    const [group, setGroup] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [file, setFile] = useState("");
    const [profile, setProfile] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [percent, setPercent] = useState(0);
    const fileRef = useRef();


    // handle submit on clicking register button
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, grade, email, password, stream, group, address, mobile, gender, dob, profile }),
            })
            let postData = await res.json();
            console.log(postData)
            if (postData.success) {
                toast.success('Signup Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
                deleteFile();
            }
            setName("")
            setGrade("")
            setEmail("")
            setPassword("")
            setStream("")
            setGroup("")
            setAddress("")
            setMobile("")
            setGender("")
            setDob("")
            setProfile("");
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
            deleteFile();
        }
    }

    // handle change of input field
    const handleInput = (e) => {
        console.log(e.target.value)
        const { value } = e.target;
        if (e.target.name == "name") {
            setName(value)
        }
        else if (e.target.name == "grade") {
            setGrade(value);
        }
        else if (e.target.name == "email") {
            setEmail(value);
        }
        else if (e.target.name == "password") {
            setPassword(value);
        }
        else if (e.target.name == "stream") {
            setStream(value);
        }
        else if (e.target.name == "group") {
            setGroup(value);
        }
        else if (e.target.name == "address") {
            setAddress(value);
        }
        else if (e.target.name == "mobile") {
            setMobile(value);
        }
        else if (e.target.name == "gender") {
            setGender(value);
        }
        else if (e.target.name == "dob") {
            setDob(value);
        }
    }

    function handleChange(event) {
        setFile(event.target.files[0]);

        // handleUpload();
    }
    function deleteFile() {
        const desertRef = ref(getStorage(), profile);
        deleteObject(desertRef).then(() => {
            console.log("delete successfully")
        }).catch((error) => {
            console.log(error);
        });
        setFile("");
        setProfile("");
        setPercent(0);
        setIsDelete(false);
    }
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/StudentProfile/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setProfile(url)
                });
            }
        );
        setIsDelete(true)
    };

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
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full flex justify-center items-start pt-10 lg:block lg:w-5/12 rounded-l-lg">
                            <div className={`relative imgContainer ${profile == "" && "border border-black"} p-3  rounded-md h-35 w-35`}>
                                <img
                                    style={{ width: "250px", height: "250px", borderRadius: "50%", margin: "auto" }}
                                    src={profile == "" ? "/upload.jpg" : profile} />
                                <input onChange={handleChange} ref={fileRef} type="file" className="hidden" />
                                {(file && percent != 100 && percent > 0) && <span className='absolute top-10 right-10 text-green-400'>{percent} %</span>}
                                {(!file && !isDelete) && <button onClick={() => fileRef.current.click()} className="w-full mt-3 cursor-pointer px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                    Choose Profile
                                </button>
                                }
                                {(file != "" && profile != "" && isDelete) && <button onClick={deleteFile} className="w-full mt-3 cursor-pointer px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                    Delete
                                </button>
                                }
                                {(file != "" && percent != 100 && !isDelete) && <button onClick={handleUpload} className="w-full mt-3 cursor-pointer px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                    Upload
                                </button>
                                }
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form onSubmit={handleSubmit} method="POST" className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                                            Student Name
                                        </label>
                                        <input
                                            name="name"
                                            onChange={handleInput}
                                            value={name}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="studentname"
                                            type="text"
                                            placeholder="Student Name"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="grade">
                                            Grade
                                        </label>
                                        <input
                                            name="grade"
                                            onChange={handleInput}
                                            value={grade}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="grade"
                                            type="text"
                                            placeholder="Grade"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
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
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            name="password"
                                            onChange={handleInput}
                                            value={password}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="*******"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="stream">
                                            Stream
                                        </label>
                                        <input
                                            name="stream"
                                            onChange={handleInput}
                                            value={stream}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="stream"
                                            type="text"
                                            placeholder="Stream"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="group">
                                            Group
                                        </label>
                                        <input
                                            name="group"
                                            onChange={handleInput}
                                            value={group}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="group"
                                            type="text"
                                            placeholder="group"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="gender">
                                            Gender
                                        </label>
                                        <input
                                            name="gender"
                                            onChange={handleInput}
                                            value={gender}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="gender"
                                            type="text"
                                            placeholder="gender"
                                            required
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="dob">
                                            Date Of Birth
                                        </label>
                                        <input
                                            name="dob"
                                            onChange={handleInput}
                                            value={dob}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="dob"
                                            type="text"
                                            required
                                            placeholder="Date Of Birth"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">
                                            Address
                                        </label>
                                        <input
                                            name="address"
                                            onChange={handleInput}
                                            value={address}
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="address"
                                            type="text"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="mobile">
                                            Mobile
                                        </label>
                                        <input
                                            name="mobile"
                                            onChange={handleInput}
                                            value={mobile}
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="mobile"
                                            type="text"
                                            min={10}
                                            max={10}
                                            required
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Register Account
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
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="./index.html"
                                    >
                                        Already have an account? Login!
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
export default Signup