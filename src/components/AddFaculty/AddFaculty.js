import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddFaculty.css"
import { addFaculty, editFaculty } from "../../api/faculties";

export default function AddFaculty(props) {
    const { addFacultyModal, setAddFacultyModal, isFacultyEdit, setIsFacultyEdit, initialValue } = props;
    const [formValues, setFormValues] = useState({...initialValue});

    const handleFacultyClick = () => {
        setAddFacultyModal(!addFacultyModal)
        setIsFacultyEdit(false)
        window.location = "/faculties"
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        isFacultyEdit ? await editFaculty(initialValue.id, formValues) : await addFaculty(formValues);
        setIsFacultyEdit(false)
        window.location = "/faculties"
    };

    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleFacultyClick}>X</Button>
            <Form className="faculty-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter faculty name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Faculty Name"
                        value={formValues?.name}
                        onChange={e => setFormValues({ ...formValues, name: e.target.value })}/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Faculty
                    </Button>
                </div>
            </Form>
       </div>
    )
}