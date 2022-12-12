import React, { useState, useEffect, useCallback } from "react"
import { Button, Form, Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./AddClassTime.css"
import { getDays, editClassTime, addClassTime } from "../../api/classtimes";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function AddClassTime(props) {
    const { addClassTimeModal, setAddClassTimeModal, isClassTimeEdit, setIsClassTimeEdit, initialValues } = props;
    const [formValues, setFormValues] = useState({...initialValues});
    const [items, setItems] = useState([]);
    const handleClassTimeClick = () => {
        setAddClassTimeModal(!addClassTimeModal);
        setIsClassTimeEdit(!isClassTimeEdit);
    }

    useEffect(() => {
        getDays().then(response => setItems(response.data));
    }, []);


    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        isClassTimeEdit ? await editClassTime(initialValues.id, formValues) : await addClassTime(formValues);
        setIsClassTimeEdit(false);
        setAddClassTimeModal(false)
        window.location = "/classTimes"
    };
    
    return (
       <div className="form-wrapper">
            <Button variant="outline-secondary" onClick={handleClassTimeClick}>X</Button>
            <Form className="group-form" onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Start time"
                            value={formValues?.startTime}
                            onChange={newValue => setFormValues({ ...formValues, startTime: newValue })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Form.Group>
                <Form.Group className="mb-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="End Time"
                            value={formValues?.endTime}
                            onChange={(newValue) => setFormValues({ ...formValues, endTime: newValue })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Form.Group>
                <select value={ formValues?.day } onChange={e => setFormValues({ ...formValues, day: e.target.value})}>
                    {items.map((item) => <option key={item.id} value={item}>{item}</option>)}
                </select>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Add Class Time
                    </Button>
                </div>
            </Form>
       </div>
    )
}