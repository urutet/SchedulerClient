import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFaculty, getFaculties } from "../../api/faculties";
import "bootstrap/dist/css/bootstrap.min.css"
import AddFaculty from "../AddFaculty/AddFaculty";
import "./Faculties.css"

export default function Faculties() {
    const [data, setData] = useState([]);
    const [addFacultyModal, setAddFacultyModal] = useState(false);
    const [isFacultyEdit, setIsFacultyEdit] = useState(false);
    const [facultyToEdit, setFacultyToEdit] = useState({});

    useEffect(() => {
        getFaculties().then(response => setData(response.data));
    }, []);

    const addFacultyClick = () => {
        setAddFacultyModal(!addFacultyModal)
    }

    const onDeleteClick = async (id) => {
        await deleteFaculty(id);
        window.location = "/faculties";
    }

    const onEditClick = async (id, item) => {
        console.log(item)
        addFacultyClick();
        setIsFacultyEdit(!isFacultyEdit);
        setFacultyToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" onClick={addFacultyClick}>Add Faculty</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map(item => (
                            <tr key={item.id}>
                                <td><Link to={'/'}>{item.name}</Link></td>
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
          {addFacultyModal ? <AddFaculty 
          addFacultyModal = {addFacultyModal}
          setAddFacultyModal = {setAddFacultyModal}
          isFacultyEdit = {isFacultyEdit}
          setIsFacultyEdit = {setIsFacultyEdit}
          initialValue = {facultyToEdit}
            /> : ""}

        </div>
        
    );
}