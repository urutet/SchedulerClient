import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Register.css"
import { register } from "../api/auth";

export default function Register(props) {
    const {loginModal, setLoginModal, registerModal, setRegisterModal} = props;
    const [formValues, setFormValues] = useState({});

    const handleRegisterClick = async (e) => {
        e.preventDefault();
        const data = await register(formValues);
        if (data.status >= 200 && data.status <= 204) {
            const {token, id, role} = data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            localStorage.setItem('role', role);
            window.location = "/";
        } else {
            window.location = "/";
        }
    }

    const handleCloseClick = () => {
        setRegisterModal(false)
    }

    return (
       <div className="form-wrapper">
            <Form className="login-form">
                <Button variant="outline-secondary" onClick={handleCloseClick}>X</Button>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setFormValues({ ...formValues, email: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setFormValues({ ...formValues, password: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={e => setFormValues({ ...formValues, confirmPassword: e.target.value })}/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit" onClick={handleRegisterClick}>
                        Register
                    </Button>
                </div>
            </Form>
       </div>
    )
}