import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:3001/user");
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/user/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-5 border border-solid">
            <h1 className="text-3xl text-center text-black">BASIC CRUD REACT JS</h1>
            <div className="flex justify-end">
            <Link to="add" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Add New
            </Link>
            </div>
            <div className="flex justify-center mt-5 mx-auto overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">No</th>
                            <th scope="col" className="py-3 px-6">Username</th>
                            <th scope="col" className="py-3 px-6">Hash Password</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                                <td className="py-4 px-6">{user.userName}</td>
                                <td className="py-4 px-6">{user.userPassword}</td>
                                <td className="py-4 px-6">{user.userStatus}</td>
                                <td className="py-4 px-6">
                                    <Link
                                        to={`edit/${user._id}`}
                                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;