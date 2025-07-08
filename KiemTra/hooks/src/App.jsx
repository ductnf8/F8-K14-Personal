import React from 'react';
import {Container} from "@mui/material";
import EmployeeTable from "./components/Table/EmployeeTable.jsx";
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <div>
            <Container sx={{mt: 5}}>
                <EmployeeTable/>
                <ToastContainer/>
            </Container>
        </div>
    );
};

export default App;
