import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuditoria, deleteAuditorium} from "../../api/auditoria"
import AddAuditorium from "../AddAuditorium/AddAuditorium";

export default function Teachers() {
    const [data, setData] = useState([]);
    const [addAuditoriumModal, setAddAuditoriumModal] = useState(false);
    const [isAuditoriumEdit, setIsAuditoriumEdit] = useState(false);
    const [auditoriumToEdit, setAuditoriumToEdit] = useState({});

    useEffect(() => {
        getAuditoria().then(response => setData(response.data));
    }, []);

    const addAuditoriumClick = () => {
        setAddAuditoriumModal(!addAuditoriumModal)
    }

    const onDeleteClick = async (id) => {
        await deleteAuditorium(id);
        window.location = "/auditoria";
    };

    const onEditClick = async (id, item) => {
        addAuditoriumClick();
        setIsAuditoriumEdit(!isAuditoriumEdit);
        setAuditoriumToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" id="addTeacher" onClick={addAuditoriumClick}>Add Auditorium</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map(item => (
                            <tr key={item.id}>
                                <td><Link to="/">{item.name}</Link></td>
                                <td>{item.type}</td>
                                <td><Link onClick={() => onEditClick(item.id, item)}>Edit</Link> | <Link onClick={() => onDeleteClick(item.id)}>Delete</Link></td>
                            </tr>
                        ))
                        : (
                            <tr>
                                <td class="text-center" colspan="3"><h3>There are no auditoria yet!</h3></td>
                            </tr>
                        )}
                </tbody>
            </table>
          {addAuditoriumModal ? <AddAuditorium 
          addAuditoriumModal = {addAuditoriumModal} 
          setAddAuditoriumModal = {setAddAuditoriumModal} 
          isAuditoriumEdit =  {isAuditoriumEdit}
          setIsAuditoriumEdit = {setIsAuditoriumEdit} 
          initialValues = {auditoriumToEdit} /> : ""}

        </div>
        
    );
}