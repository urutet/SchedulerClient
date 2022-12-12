import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import AddGroup from "../AddGroup/AddGroup";
import { deleteGroup, editGroup, getGroups } from "../../api/groups";
import "./Groups.css"


export default function Groups() {
    const [data, setData] = useState([]);
    const [addGroupModal, setAddGroupModal] = useState(false); 
    const [isGroupEdit, setIsGroupEdit] = useState(false);
    const [groupToEdit, setGroupToEdit] = useState({});

    useEffect(() => {
        getGroups().then(response => setData(response.data));
    }, []);

    const addGroupClick = () => {
        setAddGroupModal(!addGroupModal)
    }

    const onDeleteClick = async (id) => {
        await deleteGroup(id);
        window.location = "/groups";
    };

    const onEditClick = async (id, item) => {
        console.log(item)
        addGroupClick();
        setIsGroupEdit(!isGroupEdit);
        setGroupToEdit(item);
    };

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" id="addGroup" onClick={addGroupClick}>Add Group</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Group</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map(item => (
                            <tr key={item.id}>
                                <td>{item.year}</td>
                                <td><Link to={`${item.id}`}>{item.name}</Link></td>
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
          {addGroupModal ? <AddGroup 
          addGroupModal={addGroupModal} 
          setAddGroupModal = {setAddGroupModal}
          isGroupEdit = {isGroupEdit}
          setIsGroupEdit = {setIsGroupEdit}
          initialValues = {groupToEdit}
           /> : ""}

        </div>
        
    );
}