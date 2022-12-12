import React, { useState, useEffect, useCallback } from "react"
import { Button, Form, Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddAuditorium.css"
import { addAuditorium, editAuditorium, getAuditoriumTypes } from "../../api/auditoria"

export default function AddAuditorium(props) {
    const { addAuditoriumModal, setAddAuditoriumModal, isAuditoriumEdit, setIsAuditoriumEdit, initialValues } = props;
    const [formValues, setFormValues] = useState({...initialValues});
    const [items, setItems] = useState([]);
    const handleAuditoriumClick = () => {
        setAddAuditoriumModal(!addAuditoriumModal)
        setIsAuditoriumEdit(!isAuditoriumEdit);
    }

    useEffect(() => {
        getAuditoriumTypes().then(response => setItems(response.data));
    }, []);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        isAuditoriumEdit ? await editAuditorium(initialValues.id, formValues) : await addAuditorium(formValues);
        setIsAuditoriumEdit(false);
        setAddAuditoriumModal(false)
        window.location = "/auditoria"
    };
    
    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleAuditoriumClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Auditorium name</Form.Label>
                    <Form.Control type="text" placeholder="Enter auditorium name" value={ formValues?.name } onChange={e => setFormValues({ ...formValues, name: e.target.value })}/>
                </Form.Group>
                <select value={ formValues?.type } onChange={e => setFormValues({ ...formValues, type: e.target.value})}>
                    {items.map((item) => <option key={item.id} value={item}>{item}</option>)}
                </select>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Auditorium
                    </Button>
                </div>
            </Form>
       </div>
    )
}