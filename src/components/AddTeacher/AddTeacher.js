import React, { useState, useEffect, useCallback } from "react"
import { Button, Form, Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddTeacher.css"
import { addTeacher, editTeacher } from "../../api/teachers";
import { getDepartments } from "../../api/departments";

export default function AddTeacher(props) {
    const { addTeacherModal, setAddTeacherModal, isTeacherEdit, setIsTeacherEdit, initialValues } = props;
    const [formValues, setFormValues] = useState({...initialValues});
    const [image, setImage] = useState(initialValues.photo ?? undefined);
    const [items, setItems] = useState([]);
    const handleTeacherClick = () => {
        setAddTeacherModal(!addTeacherModal)
        setIsTeacherEdit(!isTeacherEdit);
        window.location = "/teachers"
    }

    const handleCreateBase64 = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const base64 = await convertToBase64(file);

        setImage(base64);
        setFormValues({ ...formValues, photo: base64 })
        e.target.value = '';
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (e) => {
                reject(e);
            }
        });
    };

    useEffect(() => {
        getDepartments().then(response => setItems(response.data));
    }, []);


    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        isTeacherEdit ? await editTeacher(initialValues.id, formValues) : await addTeacher(formValues);
        setIsTeacherEdit(false);
        setAddTeacherModal(false)
        window.location = "/teachers"
    };
    
    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleTeacherClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={ formValues?.email } onChange={e => setFormValues({ ...formValues, email: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" hidden={isTeacherEdit}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setFormValues({ ...formValues, password: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword" hidden={isTeacherEdit}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" onChange={e => setFormValues({ ...formValues, confirmPassword: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Enter teacher name</Form.Label>
                    <Form.Control
                        value={ formValues?.name }
                        type="text"
                        placeholder="Name"
                        onChange={e => setFormValues({ ...formValues, name: e.target.value })}/>
                </Form.Group>
                <select value={ formValues?.departmentId } onChange={e => setFormValues({ ...formValues, departmentId: e.target.value})}>
                    {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                <Form.Group className="mb-3">
                    <img src={image} class="img-thumbnail"/>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Example file input</label>
                        <input
                        type="file" 
                        class="form-control-file" 
                        id="exampleFormControlFile1" 
                        accept=".png, .jpg, .jpeg"
                        onChange={handleCreateBase64}/>
                    </div>
                </Form.Group>

                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Teacher
                    </Button>
                </div>
            </Form>
       </div>
    )
}