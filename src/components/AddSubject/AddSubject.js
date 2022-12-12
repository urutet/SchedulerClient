import React, { useState, useEffect, useCallback } from "react"
import { Button, Form, Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddSubject.css"
import { addTeacher, editTeacher, getTeachers } from "../../api/teachers";
import { getDepartments } from "../../api/departments";
import { getClassTimes } from "../../api/classtimes";
import { getAuditoria } from "../../api/auditoria";
import { addSubject, editSubject } from "../../api/subjects";

export default function AddSubject(props) {
    const { addSubjectModal, setAddSubjectModal, isSubjectEdit, setIsSubjectEdit, initialValues } = props;
    const [formValues, setFormValues] = useState({...initialValues});
    const [classTimes, setClassTimes] = useState([]);
    const [auditoria, setAuditoria] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const handleTeacherClick = () => {
        setAddSubjectModal(!addSubjectModal)
        setIsSubjectEdit(!isSubjectEdit);
        window.location = "/subjects"
    }

    useEffect(() => {
        getClassTimes().then(response => setClassTimes(response.data));
    }, []);

    useEffect(() => {
        getAuditoria().then(response => setAuditoria(response.data));
    }, []);

    useEffect(() => {
        getTeachers().then(response => setTeachers(response.data));
    }, []);


    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        isSubjectEdit ? await editSubject(initialValues.id, formValues) : await addSubject(formValues);
        setIsSubjectEdit(false);
        setAddSubjectModal(false)
        window.location = "/subjects"
    };
    
    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleTeacherClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Subject name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={ formValues?.name } onChange={e => setFormValues({ ...formValues, name: e.target.value })}/>
                </Form.Group>
                
                <select value={ classTimes.find(ct => ct.id == formValues?.classTimeId)?.id } onChange={e => {setFormValues({ ...formValues, classTimeId: e.target.value})}}>
                    {classTimes.map((item) => <option key={item.id} value={item.id}>{new Date(item.startTime).toLocaleTimeString()} - {new Date(item.endTime).toLocaleTimeString()} - {item.day}</option>)}
                </select>
                <select value={ auditoria.find(a => a.id == formValues?.auditoriumId)?.id } onChange={e => setFormValues({ ...formValues, auditoriumId: e.target.value})}>
                    {auditoria.map((item) => <option key={item.id} value={item.id}>{item.name} - {item.type}</option>)}
                </select>
                <select value={ teachers.find(t => t.id == formValues?.teacherId)?.id } onChange={e => setFormValues({ ...formValues, teacherId: e.target.value})}>
                    {teachers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Subject
                    </Button>
                </div>
            </Form>
       </div>
    )
}