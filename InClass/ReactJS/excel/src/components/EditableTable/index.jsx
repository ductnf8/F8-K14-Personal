import './style.sass'
import {TableContext} from "./const.js";
import {useState} from "react";
import Row from "./Row.jsx";
import CellSelection from "./CellSelection.jsx";

const defaultCursors = {
    rowIndex: 0,
    columnIndex: 0,
    top: 0,
    left: 0,
}
export default function ({columns, rows}) {
    const [cursor, setCursor] = useState({...defaultCursors})

    console.log(cursor)

    const providers = {
        columns, rows, cursor, setCursor
    };

    return (
        <TableContext value={providers}>
            <table className={'editable-table'}>
                <thead>
                <tr>
                    {
                        columns.map(c => {
                            return <th key={c.name}>{c.name}</th>
                        })
                    }
                </tr>

                </thead>
                <tbody>
                {
                    rows.map(row => {
                        return (
                            <Row key={row.product} row={row}/>
                        )
                    })
                }
                </tbody>
            </table>
            <CellSelection/>
        </TableContext>
    )
}