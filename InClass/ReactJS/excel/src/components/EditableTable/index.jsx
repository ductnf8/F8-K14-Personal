import './style.sass'
import {TableContext} from "./const.js";
import {useState} from "react";
import Row from "./Row.jsx";
import CellSelection from "./CellSelection.jsx";
import CellInput from "./CellInput.jsx";

const defaultCursors = {
    rowIndex: 0,
    columnIndex: 0,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    isEditing: false
}
export default function ({columns, rows}) {
    const [cursor, setCursor] = useState({...defaultCursors})

    const providers = {
        columns, rows, cursor, setCursor
    }

    const onKeyDown = () => {
        console.log('onKeyDown')
    }

    return (
        <TableContext value={providers}>
            <div style={{position: 'relative'}}>
                <table className={'editable-table'} onKeyDown={onKeyDown}>
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
                        rows.map((row, index) => {
                            return (
                                <Row key={row.product} row={row} rowIndex={index}/>
                            )
                        })
                    }
                    </tbody>
                </table>
                <CellInput/>
                <CellSelection/>
            </div>
        </TableContext>
    )
}