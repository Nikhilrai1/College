import React, { useState, useEffect } from 'react'
import Link from "next/Link";
import { FaEllipsisV } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getStorage } from "firebase/storage";


const GetAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        getAssignments();
    }, [])

    const getAssignments = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getassignment`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
            let postData = await res.json();
            console.log(postData.info)
            setAssignments(postData.info)
        } catch (err) {
            console.log(err);
        }

    }
    const deleteAssignment = async (id, creatorEmail, fileUrl) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteassignment`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                    "id": `${id}`,
                    "email": `${creatorEmail}`
                },
            })
            let deleteData = await res.json();
            if (deleteData.success) {
                getAssignments();
                if(fileUrl != ""){
                    deleteFile(fileUrl);
                }
                toast.success(deleteData.info, {
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
                toast.error(deleteData.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            toast.error('Server Error', {
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
    function deleteFile(fileUrl) {
    const desertRef = ref(getStorage(), fileUrl);
    deleteObject(desertRef).then(() => {
      console.log("delete successfully")
    }).catch((error) => {
      console.log(error);
    });
  }
    return (
        <section className="text-gray-600 body-font">
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
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        assignments.map((data) => {
                            return (
                                <div key={data._id} className="xl:w-1/3 md:w-1/2 p-2">
                                    <div className="border border-gray-200 p-6 rounded-lg">
                                        <div className="flex p-1 justify-between items-center">
                                            <span className="w-1/6">
                                                <img src={data.creatorProfile == "" ? "user.webp" : data.creatorProfile} className={"cursor-pointer h-7 w-7 rounded-full"} />
                                            </span>
                                            <span className='flex justify-start items-center w-3/6'>
                                                <h1 className="text-sm font-md">{data.creatorName}</h1>
                                            </span>
                                            <span className="relative group cursor-pointer hover:text-blue-500">
                                                <FaEllipsisV className="cursor-pointer" />
                                                <div className={`mt-1 w-35 right-0 absolute hidden group-hover:block rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                                    <div className="py-1" role="none">
                                                        <Link href={"/editassignment"}><a href="#" className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Edit</a></Link>
                                                        <button onClick={() => deleteAssignment(data._id, data.creatorEmail,data.file)} className="hover:text-blue-500 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Delete</button>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{data.title}</h2>
                                        <p className="leading-relaxed text-base mb-2">{data.desc}</p>
                                        <p className="leading-relaxed text-base mb-2">{data.creatorEmail}</p>
                                        <h4 className="leading-relaxed text-base mb-2"><b>Submission Date: {data.deadline}</b></h4>
                                        <Link href={`Assignment/${data._id}`}><a className="cursor-pointer text-sm text-blue-500 hover:text-blue-600 mt-2">View Assignment</a></Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default GetAssignments;
