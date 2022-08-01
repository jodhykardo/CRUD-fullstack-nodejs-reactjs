import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

const AddUser = () => {
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const messageAlert = (message) => {
        return (
            <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <svg aria-hidden="true" class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                    {message}
                </div>
            </div>
        )
    }
    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/user", {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
            });
            navigate("/");
        } catch (error) {
            const alert = messageAlert(error.response.data.Message);
            ReactDOM.render(alert, document.getElementById('alert'));
        }
    };

    return (
        <div className="mt-5 w-1/2">
            <div id="alert"></div>
            <h1 className="text-3xl text-center text-black">Add User</h1>
            <div className="mt-5">
                <form onSubmit={saveUser}>
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
                        <label className="block my-3 text-sm font-medium text-gray-900">Password</label>
                        <div className="control">
                            <input
                                type="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block my-3 text-sm font-medium text-gray-900">Confirm Password</label>
                        <div className="control">
                            <input
                                type="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
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
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;