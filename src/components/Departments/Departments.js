import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import AddDepartment from "../AddDepartment/AddDepartment";
import { deleteDepartment, editDepartment, getDepartments } from "../../api/departments";

export default function Departments() {
    const [data, setData] = useState([]);
    const [addDepartmentModal, setAddDepartmentModal] = useState(false);
    const [isDepartmentEdit, setIsDepartmentEdit] = useState(false);
    const [departmentToEdit, setDepartmentToEdit] = useState({});

    useEffect(() => {
        getDepartments().then(response => setData(response.data));
    }, []);

    const addDepartmentClick = () => {
        setAddDepartmentModal(!addDepartmentModal)
    }

    const onDeleteClick = async (id) => {
        await deleteDepartment(id);
        window.location = "/departments";
    }

    const onEditClick = async (id, item) => {
        console.log(item)
        addDepartmentClick();
        setIsDepartmentEdit(!isDepartmentEdit);
        setDepartmentToEdit(item);
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" onClick={addDepartmentClick}>Add department</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Department</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map(item => (
                            <tr key={item.id}>
                                <td><Link to="/">{item.name}</Link></td>
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
          {addDepartmentModal ? <AddDepartment 
          addDepartmentsModal = {addDepartmentModal}
          setAddDepartmentModal = {setAddDepartmentModal}
          isDepartmentEdit = {isDepartmentEdit}
          setIsDepartmentEdit = {setIsDepartmentEdit}
          initialValue = {departmentToEdit}
          /> : ""}

        </div>
        
    );
}