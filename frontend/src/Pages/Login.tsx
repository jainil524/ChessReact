import React, { useState } from 'react';
import { loginUser } from '../utils/api';
import { saveToken } from '../utils/auth';

const Login = ({ onLogin }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await loginUser({ username, password });
        if (response.status === "success") {
            saveToken(response.data.token);
            onLogin();
        } else {
            alert(response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
