import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDepartments } from "../../api/departments";
import { deleteTeacher, editTeacher, getTeachers } from "../../api/teachers";
import AddTeacher from "../AddTeacher/AddTeacher";
import "./Teachers.css"

export default function Teachers() {
    const [data, setData] = useState([]);
    const [addTeacherModal, setAddTeacherModal] = useState(false);
    const [isTeacherEdit, setIsTeacherEdit] = useState(false);
    const [teacherToEdit, setTeacherToEdit] = useState({});
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getTeachers().then(response => setData(response.data));
    }, []);

    useEffect(() => {
        getDepartments().then(response => setDepartments(response.data));
    }, []);

    const addTeacherClick = () => {
        setAddTeacherModal(!addTeacherModal)
    }

    const onDeleteClick = async (id) => {
        await deleteTeacher(id);
        window.location = "/teachers";
    };

    const onEditClick = async (id, item) => {
        addTeacherClick();
        setIsTeacherEdit(!isTeacherEdit);
        setTeacherToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" id="addTeacher" onClick={addTeacherClick}>Add Teacher</button>
            <table>
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
                                <td><Link to={`/teachers/${item.id}`}>{item.name}</Link></td>
                                <td>{departments.filter(department => department.id == item.departmentId)[0].name}</td>
                                <td><Link onClick={() => onEditClick(item.id, item)}>Edit</Link> | <Link onClick={() => onDeleteClick(item.id)}>Delete</Link></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td class="text-center" colspan="3"><h3>There are no records in dictionary yet!</h3></td>
                            </tr>
                        )}
                </tbody>
            </table>
          {addTeacherModal ? <AddTeacher 
          addTeacherModal = {addTeacherModal} 
          setAddTeacherModal = {setAddTeacherModal} 
          isTeacherEdit =  {isTeacherEdit}
          setIsTeacherEdit = {setIsTeacherEdit} 
          initialValues = {teacherToEdit} /> : ""}

        </div>
        
    );
}