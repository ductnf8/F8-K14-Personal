import React from 'react';
import {TableCell} from "@mui/material";

const EmployeeCell = ({name, value, onChange}) => {
    return (
        <TableCell
            type=""
            name={name}
            value={value}
            onChange={onChange}
        >
            {value}
        </TableCell>
    );
};

export default EmployeeCell;
