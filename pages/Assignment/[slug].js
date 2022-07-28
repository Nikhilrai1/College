import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import Link from "next/Link";
import mongoose from "mongoose";
import Assignment from '../../models/Assignment';


const Slug = ({ assignment }) => {

    return (
        <div style={{ marginTop: "75px" }}>
            <section className="text-gray-600 body-font">
                <div className="pt-20 relative bg-gray-50 container shadow-xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <div class="m-4">
                            <label class="inline-block mb-2 text-gray-500">File</label>
                            <div class="flex items-center justify-center w-full">
                                <label
                                    class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div class="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            {assignment.file ? "1" : "No"} Attachment</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {assignment.file != "" && <div class="flex justify-center p-2">
                            <button class="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"><a href={assignment.file}>View File</a></button>
                        </div>
                        }
                    </div>
                    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded md:w-1/2 w-5/6 md:mb-0">
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                                    Title
                                </label>
                                <p>{assignment.title}</p>
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="grade">
                                    Grade
                                </label>
                                <p>{assignment.grade}</p>
                            </div>
                        </div>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="stream">
                                    Stream
                                </label>
                                <p>{assignment.stream}</p>
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="group">
                                    Group
                                </label>
                                <p>{assignment.group}</p>
                            </div>
                        </div>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subject">
                                    Subject
                                </label>
                                <p>{assignment.subject}</p>
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="deadline">
                                    Deadline
                                </label>
                                <p>{assignment.deadline}</p>
                            </div>
                        </div>
                        <div className="w-full mt-4 mb-4 md:mr-2 md:mb-0">
                            <div style={{ width: "100%" }} className="mb-3 xl:w-96">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="desc">
                                    Description
                                </label>
                                <p>{assignment.desc}</p>
                            </div>
                        </div>
                    </div>
                    <Link href={"/update"} >
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

export default Slug

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const assignment = await Assignment.findOne({ _id: context.query.slug });
    // console.log(assignment);
    return {
        props: { assignment: JSON.parse(JSON.stringify(assignment)) },
    }
}