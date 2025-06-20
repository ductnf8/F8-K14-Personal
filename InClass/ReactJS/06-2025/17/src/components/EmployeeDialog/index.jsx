import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {useEffect, useState} from "react";
import DialogContainer from "../DialogContainer/index.jsx";

export default function ({isOpen, setIsOpen, employee, onSave}) {
    const [inputtingEmployee, setInputtingEmployee] = useState({...employee})

    useEffect(() => {
        setInputtingEmployee({...employee})
    }, [employee]);

    const onClickSave = () => {
        console.log(employee)
    }

    const onInput = (e) => {
        setInputtingEmployee({...inputtingEmployee, [e.target.name]: e.target.value})
    }

    return (
        <DialogContainer open={isOpen} onClose={() => setIsOpen(false)}>
            <TextField
                fullWidth
                name="name"
                label="name"
                variant="standard"
                value={inputtingEmployee.name || ''}
                onChange={(e) => onInput(e)}
            />
            <TextField
                sx={{marginTop: '12px'}}
                fullWidth
                name="age"
                label="age"
                variant="standard"
                value={inputtingEmployee.age || ''}
                onChange={(e) => onInput(e)}
            />
            <TextField
                sx={{marginTop: '12px'}}
                fullWidth
                name="address"
                label="address"
                variant="standard"
                value={inputtingEmployee.address || ''}
                onChange={(e) => onInput(e)}
            />
        </DialogContainer>
    )
}