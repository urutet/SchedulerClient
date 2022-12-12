import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuditoria } from "../../api/auditoria";
import { getClassTimes } from "../../api/classtimes";
import { deleteSubject, getSubjects } from "../../api/subjects";
import { getTeachers } from "../../api/teachers";
import AddSubject from "../AddSubject/AddSubject";
import AddTeacher from "../AddTeacher/AddTeacher";
import "./Subjects.css"

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [classTimes, setClassTimes] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [auditoria, setAuditoria] = useState([]);
    const [addSubjectModal, setAddSubjectModal] = useState(false);
    const [isSubjectEdit, setIsSubjectEdit] = useState(false);
    const [subjectToEdit, setSubjectToEdit] = useState({});

    useEffect(() => {
        getSubjects().then(response => setSubjects(response.data));
    }, []);

    useEffect(() => {
        getClassTimes().then(response => setClassTimes(response.data));
    }, []);

    useEffect(() => {
        getTeachers().then(response => setTeachers(response.data));
    }, []);

    useEffect(() => {
        getAuditoria().then(response => setAuditoria(response.data));
    }, []);


    const addSubjectClick = () => {
        setAddSubjectModal(!addSubjectModal)
    }

    const onDeleteClick = async (id) => {
        await deleteSubject(id);
        window.location = "/teachers";
    };

    const onEditClick = async (id, item) => {
        addSubjectClick();
        setIsSubjectEdit(!isSubjectEdit);
        setSubjectToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" id="addTeacher" onClick={addSubjectClick}>Add Subject</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Time</th>
                        <th scope="col">Name</th>
                        <th scope="col">Auditorium</th>
                        <th scope="col">Teacher</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects
                        ? subjects.map(subject => (
                            <tr key={subject.id}>
                                <td>{new Date(classTimes.find(ct => ct.id == subject.classTimeId)?.startTime).toLocaleTimeString()} - {new Date(classTimes.find(ct => ct.id == subject.classTimeId)?.endTime)?.toLocaleTimeString()} - {classTimes.find(ct => ct.id == subject.classTimeId)?.day}</td>
                                <td>{subject.name}</td>
                                <td>{auditoria.find(a => a.id == subject.auditoriumId)?.name}</td>
                                <td>{teachers.find(t => t.id == subject.teacherId)?.name}</td>
                                <td><Link onClick={() => onEditClick(subject.id, subject)}>Edit</Link> | <Link onClick={() => onDeleteClick(subject.id)}>Delete</Link></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td class="text-center" colspan="3"><h3>There are no teachers in dictionary yet!</h3></td>
                            </tr>
                        )}
                </tbody>
            </table>
          {addSubjectModal ? <AddSubject 
          addSubjectModal = {addSubjectModal} 
          setAddSubjectModal = {setAddSubjectModal} 
          isSubjectEdit =  {isSubjectEdit}
          setIsSubjectEdit = {setIsSubjectEdit} 
          initialValues = {subjectToEdit} /> : ""}

        </div>
        
    );
}