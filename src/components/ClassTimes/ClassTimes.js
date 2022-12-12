import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getClassTimes, deleteClassTime } from "../../api/classtimes";
import AddClassTime from "../AddClassTime/AddClassTime";
import AddTeacher from "../AddTeacher/AddTeacher";

export default function ClassTimes() {
    const [data, setData] = useState([]);
    const [addClassTimeModal, setAddClassTimeModal] = useState(false);
    const [isClassTimeEdit, setIsClassTimeEdit] = useState(false);
    const [classTimeToEdit, setClassTimeToEdit] = useState({});

    useEffect(() => {
        getClassTimes().then(response => setData(response.data));
    }, []);

    const addTeacherClick = () => {
        setAddClassTimeModal(!addClassTimeModal)
    }

    const onDeleteClick = async (id) => {
        await deleteClassTime(id);
        window.location = "/classTimes";
    };

    const onEditClick = async (id, item) => {
        addTeacherClick();
        setIsClassTimeEdit(!isClassTimeEdit);
        setClassTimeToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" id="addTeacher" onClick={addTeacherClick}>Add Class Time</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Day</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map(item => (
                            <tr key={item.id}>
                                <td>{item.day}</td>
                                <td>{new Date(item.startTime).toLocaleTimeString()}</td>
                                <td>{new Date(item.endTime).toLocaleTimeString()}</td>
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
          {addClassTimeModal ? <AddClassTime 
          addClassTimeModal = {addClassTimeModal} 
          setAddClassTimeModal = {setAddClassTimeModal} 
          isClassTimeEdit =  {isClassTimeEdit}
          setIsClassTimeEdit = {setIsClassTimeEdit} 
          initialValues = {classTimeToEdit} /> : ""}

        </div>
        
    );
}