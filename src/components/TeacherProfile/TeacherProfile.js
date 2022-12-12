import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getAuditoria } from "../../api/auditoria";
import { getUser } from "../../api/auth";
import { getClassTimes } from "../../api/classtimes";
import { getSubjects } from "../../api/subjects";
import { addComment, getTeachers } from "../../api/teachers";
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default function TeacherProfile() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [subjects, setSubjects] = useState([])
    const [classTimes, setClassTimes] = useState([]);
    const [auditoria, setAuditoria] = useState([]);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        if(id){
            getTeachers().then(response => setUser(response.data.find(t => t.id == id)))
        }
    }, []);

    useEffect(() => {
        getClassTimes().then(response => setClassTimes(response.data));
    }, []);

    useEffect(() => {
        getAuditoria().then(response => setAuditoria(response.data));
    }, []);

    useEffect(() => {
        getSubjects().then(response => setSubjects(response.data.filter(s => s.teacherId == id)))
    }, [])

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, teacherId: id })
        await addComment(id, { ...formValues, teacherId: id });
        window.location = `/teachers/${id}`
    };

    return(
        <>
            <img src={user.photo} className="img-thumbnail"/>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <ul>
            {subjects?.map(subject => (
                <li key={subject.id}>
                    <div>
                        <h4>{subject.name}</h4>
                        <p>{classTimes.find(ct => ct.id == subject.classTimeId)?.day} - {new Date(classTimes.find(ct => ct.id == subject.classTimeId)?.startTime).toLocaleTimeString()} - {new Date(classTimes.find(ct => ct.id == subject.classTimeId)?.endTime).toLocaleTimeString()}</p>
                        <p>{auditoria.find(a => a.id == subject.auditoriumId)?.name} - {auditoria.find(a => a.id == subject.auditoriumId)?.type}</p>
                    </div>
                </li>
            ))}
            </ul>

            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" placeholder="Enter comment" onChange={e => setFormValues({ ...formValues, comment: e.target.value })}/>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add comment
                    </Button>
                </div>
            </Form>
            <h3>Comments</h3>
            {user?.comments?.map(comment => (
                <li key={comment.id}>{comment.comment}</li>
            ))}
        </>
    )
}