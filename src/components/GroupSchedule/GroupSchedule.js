import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuditoria } from "../../api/auditoria";
import { getClassTimes } from "../../api/classtimes";
import { getDepartments } from "../../api/departments";
import { deleteSchedule, getSchedulesByGroupId } from "../../api/schedules";
import { getSubjects } from "../../api/subjects";
import { deleteTeacher, editTeacher, getTeachers } from "../../api/teachers";
import AddSchedule from "../AddSchedule/AddSchedule";
import AddTeacher from "../AddTeacher/AddTeacher";
import "./GroupSchedule.css"

export default function GroupSchedule() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [addGroupScheduleModal, setAddGroupScheduleModal] = useState(false);
    const [isGroupScheduleEdit, setIsGroupScheduleEdit] = useState(false);
    const [groupScheduleToEdit, setGroupScheduleToEdit] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classTimes, setClassTimes] = useState([]);
    const [auditoria, setAuditoria] = useState([]);

    useEffect(() => {
        if(id) {
            getSchedulesByGroupId(id).then(response => setData(response.data));
        }
    }, []);

    useEffect(() => {
        getSubjects().then(response => setSubjects(response.data));
    }, []);

    useEffect(() => {
        getTeachers().then(response => setTeachers(response.data));
    }, []);

    useEffect(() => {
        getClassTimes().then(response => setClassTimes(response.data));
    }, []);

    useEffect(() => {
        getAuditoria().then(response => setAuditoria(response.data));
    }, []);

    const addGroupScheduleClick = () => {
        setAddGroupScheduleModal(!addGroupScheduleModal)
    }

    const onDeleteClick = async (id) => {
        await deleteSchedule(id);
        window.location = `/groups/${id}`;
    };

    const onEditClick = async (id, item) => {
        addGroupScheduleClick();
        setIsGroupScheduleEdit(!isGroupScheduleEdit);
        setGroupScheduleToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" id="addTeacher" onClick={addGroupScheduleClick}>Add Schedule</button>
            {/* <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map(item => (
                            <tr key={item.id}>
                                <td><Link to="/">{item.name}</Link></td>
                                <td>{subjects.filter(subject => subject.id == item.subjectIds.subjectId)[0].name}</td>
                                <td><Link onClick={() => onEditClick(item.id, item)}>Edit</Link> | <Link onClick={() => onDeleteClick(item.id)}>Delete</Link></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td class="text-center" colspan="3"><h3>There are no records in dictionary yet!</h3></td>
                            </tr>
                        )}
                </tbody>
            </table> */}
            {data
                ? data.map(item => (
                    <React.Fragment key={item.id}>
                        <h3> Week {item.week}</h3>
                        <ul>
                            {item?.subjects?.map(subject => (
                                <li key={subject.id}>
                                    <div>
                                        <h4>{subject.name}</h4>
                                        <p>{new Date(classTimes.find(ct => ct.id == subject.classTimeId)?.startTime).toLocaleTimeString()} - {new Date(classTimes.find(ct => ct.id == subject.classTimeId)?.endTime).toLocaleTimeString()}</p>
                                        <Link to={`/teachers/${subject.teacherId}`}>{teachers.find(t => t.id == subject.teacherId)?.name}</Link>
                                        <p>{auditoria.find(a => a.id == subject.auditoriumId)?.name} - {auditoria.find(a => a.id == subject.auditoriumId)?.type}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ React.Fragment>
                ))
                : (
                    <tr>
                        <td class="text-center" colspan="3"><h3>There are no records in dictionary yet!</h3></td>
                    </tr>
            )}

          {addGroupScheduleModal ? <AddSchedule 
          addGroupScheduleModal = {addGroupScheduleModal} 
          setAddGroupScheduleModal = {setAddGroupScheduleModal} 
          isGroupScheduleEdit =  {isGroupScheduleEdit}
          setIsGroupScheduleEdit = {setIsGroupScheduleEdit} 
          initialValues = {groupScheduleToEdit} /> : ""}

        </div>
        
    );
}