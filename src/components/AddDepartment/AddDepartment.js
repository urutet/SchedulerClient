import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddDepartment.css"
import { addDepartment, editDepartment } from "../../api/departments";

export default function AddDepartment(props) {
    const { addDepartmentModal, setAddDepartmentModal, isDepartmentEdit, setIsDepartmentEdit, initialValue } = props;
    const [formValues, setFormValues] = useState({...initialValue});

    const handleDepartmentClick = () => {
        setAddDepartmentModal(false)
        window.location = "/departments";
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        isDepartmentEdit ? await editDepartment(initialValue.id, formValues) : await addDepartment(formValues);
        setIsDepartmentEdit(false)
        setAddDepartmentModal(false)
        window.location = "/departments";
    };

    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleDepartmentClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter department name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Department Name"
                        value={formValues?.name}
                        onChange={e => setFormValues({ ...formValues, name: e.target.value })}/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Department
                    </Button>
                </div>
            </Form>
       </div>
    )
}