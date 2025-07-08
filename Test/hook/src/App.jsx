import React from 'react';
import EmployeeTable from './components/pages/EmployeeTable.jsx';
import {ToastContainer} from 'react-toastify';

const App = () => {
    return (
        <>
            <EmployeeTable/>
            <ToastContainer position="top-right" autoClose={3000}/>
        </>
    );
};

export default App;
