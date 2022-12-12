import React, { useState, useEffect } from "react"
import { Button, Form, Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddSchedule.css"
import { addTeacher, editTeacher } from "../../api/teachers";
import { getDepartments } from "../../api/departments";
import { getSubjects } from "../../api/subjects";
import { editSchedule, addSchedule } from "../../api/schedules";
import { useParams } from "react-router-dom";

export default function AddSchedule(props) {
    const { addGroupScheduleModal, setAddGroupScheduleModal, isGroupScheduleEdit, setIsGroupScheduleEdit, initialValues } = props;
    const [formValues, setFormValues] = useState({...initialValues});
    const [items, setItems] = useState([]);
    const { id } = useParams();
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleScheduleClick = () => {
        setAddGroupScheduleModal(!addGroupScheduleModal)
        setIsGroupScheduleEdit(!isGroupScheduleEdit);
        window.location = `/groups/${initialValues.groupId}`
    }

    useEffect(() => {
        getSubjects().then(response => setItems(response.data));
    }, []);

    const handleSelectedSubjects = (e) => {
        let Ids = Array.from(e.target.selectedOptions, option => option.value);
        let values = Ids.map((subjectId) => items.filter(s => s.id == subjectId))
        setFormValues({ ...formValues, subjectIds: Ids })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, groupId: id })
        console.log(formValues);
        isGroupScheduleEdit ? await editSchedule(initialValues.id, { ...formValues, groupId: id }) : await addSchedule({ ...formValues, groupId: id });
        setIsGroupScheduleEdit(false);
        setAddGroupScheduleModal(false)
        window.location = `/groups/${id}`
    };
    
    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleScheduleClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Week</Form.Label>
                    <Form.Control type="text" placeholder="Enter week" value={ formValues?.week } onChange={e => setFormValues({ ...formValues, week: e.target.value })}/>
                </Form.Group>
                <select multiple={true} onChange={handleSelectedSubjects}>
                    {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Schedule
                    </Button>
                </div>
            </Form>
       </div>
    )
}