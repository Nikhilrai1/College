import React, { useEffect, useState } from 'react';
import Link from "next/Link";
import { AiOutlineEdit } from 'react-icons/ai';
import { useRouter } from "next/router"


const Profile = () => {
    const [student, setStudent] = useState({});
    const { asPath } = useRouter();


    const getProfile = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tokendecrypt`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            let data = await res.json();
            setStudent(data.info);
            console.log(data.info);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <div style={{ marginTop: "75px" }}>
            <section className="text-gray-600 body-font">
                <div className="pt-20 relative bg-gray-50 container shadow-xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover h-32 w-32 object-center rounded-full m-auto" alt="profile" src={student.profile == "" ? "/user.webp" : student.profile} />
                        <h1 className='my-2 text-center text-2xl font-extrabold'>{student.name}</h1>
                        <h4 className="my-2 text-center font-semibold">{student.isStudent ? "Student" : "Teacher"}</h4>
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <table className="text-xs my-3">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Email</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.email}</td>
                                </tr>
                                { !student.isTeacher && <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Grade</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.grade}</td>
                                </tr>}
                                { !student.isTeacher && <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Stream</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.stream}</td>
                                </tr>}
                                { student.isTeacher && <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Subject</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.subject}</td>
                                </tr>}
                                <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Gender</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.gender}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Dob</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.dob} BS</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Address</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.address}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-purple-900 font-bold text-lg">Mobile</td>
                                    <td className="px-2 py-2 text-lg  font-bold">: {student.mobile}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link href={`/student/update/${student.email}`} >
                        <div className="button flex py-1 px-2 hover:border-blue-600 border-green-500 items-center border rounded-sm cursor-pointer absolute top-4 right-4">
                            <AiOutlineEdit className="mr-1 text-green-500" />
                            <span className="text-green-500">Edit</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Profile