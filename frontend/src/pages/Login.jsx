import React, { useState } from 'react';
import axios from '../services/axios';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/token/', { username, password });
            const token = response.data.access;
            localStorage.setItem('jwt_token', token);

            setAuthenticated(true);
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error during login:', errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-sky-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-sky-700 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-400 text-white font-semibold rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

