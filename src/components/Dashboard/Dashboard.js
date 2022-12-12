import { useEffect, useState } from "react"
import { getAuditoria } from "../../api/auditoria";
import { getUser } from "../../api/auth";
import { getClassTimes } from "../../api/classtimes";
import { getSubjects } from "../../api/subjects";
import { getTeachers } from "../../api/teachers";

export default function Dashboard() {
    const [user, setUser] = useState({})
    const [image, setImage] = useState(false)
    const [subjects, setSubjects] = useState([]);
    const [classTimes, setClassTimes] = useState([]);
    const [auditoria, setAuditoria] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("id")){
            switch(localStorage.getItem("role"))
            {
                case "Manager":
                    break;
                case "Teacher":
                    getTeachers().then(response => setUser(response.data.find(t => t.id == localStorage.getItem("id"))))
                    getSubjects().then(response => setSubjects(response.data.filter(s => s.teacherId == localStorage.getItem("id"))))
                    getClassTimes().then(response => setClassTimes(response.data));
                    getAuditoria().then(response => setAuditoria(response.data));
                    setImage(user.photo)
                    break;
                case "Student":
                    break;
            }
        }
    }, []);

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
        </>
    )
}