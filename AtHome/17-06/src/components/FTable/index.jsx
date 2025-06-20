import {createContext, useContext} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const TableContext = createContext(null)
const Cell = ({row, column}) => {
    const {onEdit, onDelete} = useContext(TableContext)

    return (
        <TableCell>

            {
                column.name === 'action'
                    ? <>
                        <ModeEditOutlineOutlinedIcon
                            color='success'
                            sx={{cursor: 'pointer', mr: 1}}
                            onClick={() => onEdit(row)}
                        />
                        <DeleteOutlineOutlinedIcon
                            color='error'
                            sx={{cursor: 'pointer', mr: 1}}
                            onClick={() => onDelete(row.id)}
                        />
                    </>
                    : <span>{row[column.name]}</span>
            }
        </TableCell>

    )
}

const Row = ({row}) => {
    const {columns} = useContext(TableContext)

    return (
        <TableRow>
            {
                columns.map(col => (
                    <Cell
                        key={`table-cell-${row.id}-${col.name}`}
                        row={row}
                        column={col}
                    />
                ))
            }
        </TableRow>
    )
}

export default function FTable({columns, rows, onEdit, onDelete}) {
    const provider = {
        columns, rows, onEdit, onDelete
    }

    return (
        <TableContext value={provider}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(col => (
                                    <TableCell
                                        key={`${col.name}`}
                                    >{col.text}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            rows.map(row => (
                                <Row
                                    key={`${row.id}`}
                                    row={row}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </TableContext>
    )
}