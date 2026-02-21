import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/Authentication/AuthActions';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../utils/HttpRequest';
import getAbsolutePathUrl from '../utils/URLManager';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLogingError] = useState(false);
    const [checkedAuth, setCheckedAuth] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // If user already has a token (e.g. after reload at root), redirect to notes
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(getAbsolutePathUrl('notes'), { replace: true });
            return;
        }
        setCheckedAuth(true);
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest('POST', '/login/', {
                username,
                password
            }, false);
            const token = responseData.token;
            dispatch(login(token));
            localStorage.setItem('token', token);
            navigate(getAbsolutePathUrl('notes'));
        } catch (error) {
            setLogingError(true);
            console.error('Error logging in:', error);
        }
    };

    if (!checkedAuth) {
        return null; // Avoid flashing login form before redirect when already logged in
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    {loginError && <Alert variant="danger">Invalid credentials</Alert>}
                </Form>
            </div>
        </div>
    );
};

export default Login;
