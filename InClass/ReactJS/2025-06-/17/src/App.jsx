import React, {useState} from 'react';
import FTable from "./components/FTable/index.jsx";
import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";

const App = () => {

    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const columns = [
        {name: 'id', text: 'Id'},
        {name: 'name', text: 'Name'},
        {name: 'age', text: 'Age'},
        {name: 'address', text: 'Address'},
        {name: 'action', text: ''}
    ]
    const rows = [
        {id: 1, name: 'viet', age: 23, address: 'Ha noi'},
        {id: 2, name: 'viet nam', age: 23},
        {id: 3, name: 'viet', age: 23},
    ]
    return (
        <>
            <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                <DialogTitle>New Employee</DialogTitle>
                <DialogContent>
                    <TextField label='name' fullWidth variant='standard'/>
                    <TextField label='age' fullWidth variant='standard'/>
                    <TextField label='address' fullWidth variant='standard'/>
                </DialogContent>
            </Dialog>
            <FTable columns={columns} rows={rows}/>
            <Button variant='outlined' onClick={() => setIsOpenDialog(true)}>Add new</Button>
        </>

    );
};

export default App;
