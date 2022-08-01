import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [username, setName] = useState("");
    const [status, setStatus] = useState("y");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:3001/user/${id}`);
        setName(response.data.userName);
        setStatus(response.data.userStatus);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/user/${id}`, {
                username: username,
                status: status,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-5 w-1/2">
            <div id="alert"></div>
            <h1 className="text-3xl text-center text-black">Add User</h1>
            <div className="mt-5">
                <form onSubmit={updateUser}>
                    <div>
                        <label className="block my-3 text-sm font-medium text-gray-900">Username</label>
                        <div className="control">
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block my-3 text-sm font-medium text-gray-900">Status</label>
                        <div className="control">
                            <div>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="y">Active</option>
                                    <option value="n">Not Active</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="mt-2">
                            <Link to="/">
                                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                                    Back
                                </button>
                            </Link>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;