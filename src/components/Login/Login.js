import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css"
import { login } from "../../api/auth";

export default function Login(props) {
    const [formValues, setFormValues] = useState({});


    const { loginModal, setLoginModal, setRegisterModal } = props;

    const handleLoginClick = () => {
        setLoginModal(!loginModal)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const info = await login(formValues);
        const {token, id, role} = info.data;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('role', role);
        window.location = "/";
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        handleLoginClick();
        setRegisterModal(true);
    }

    return (
       <div className="form-wrapper">
            <Form className="login-form">
            <Button variant="outline-secondary" onClick={handleLoginClick}>X</Button>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setFormValues({ ...formValues, email: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setFormValues({ ...formValues, password: e.target.value })}/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button onClick={handleRegisterClick} variant="outline-secondary">
                        Register
                    </Button>
                </div>
            </Form>
       </div>
    )
}