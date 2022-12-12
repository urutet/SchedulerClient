import React, { useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddGroup.css"
import { addGroup, editGroup } from "../../api/groups";
import { getFaculties } from "../../api/faculties";

export default function AddGroup(props) {
    const { addGroupModal, setAddGroupModal, isGroupEdit, setIsGroupEdit, initialValues } = props;
    const [formValues, setFormValues] = useState({...initialValues});
    const [items, setItems] = useState([]);

    useEffect(() => {
        getFaculties().then(response => setItems(response.data));
    }, []);


    const handleGroupClick = () => {
        setAddGroupModal(!addGroupModal)
        setIsGroupEdit(false)
        window.location = "/groups"
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        isGroupEdit ? await editGroup(initialValues.id, formValues) : await addGroup(formValues);
        setIsGroupEdit(false)
        setAddGroupModal(false)
        window.location = "/groups"
    };

    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleGroupClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter group year</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Group Year"
                        value = {formValues?.year}
                        onChange={e => setFormValues({ ...formValues, year: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Enter group name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Group Name"
                        value = {formValues?.name}
                        onChange={e => setFormValues({ ...formValues, name: e.target.value })}/>
                </Form.Group>
                <select value={ formValues?.facultyId } onChange={e => setFormValues({ ...formValues, facultyId: e.target.value})}>
                    {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Group
                    </Button>
                </div>
            </Form>
       </div>
    )
}