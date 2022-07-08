import React from 'react';
import Link from "next/Link";
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {
    return (
        <div>
            <header className="text-gray-600 body-font shadow-md px-7">
                <div className="flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <span className="left text-2xl text-purple-900 font-bold w-1/6">Dashboard</span>
                    <div className="middle flex w-4/6">
                        <div class="flex items-center w-full px-7">
                            <span className="p-1 border border-black"><AiOutlineSearch className="text-xl"/></span>
                            <input placeholder="Search" type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="right w-1/6 flex justify-center items-center">
                        <button className="flex text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-900 rounded text-lg">Settings</button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar