import {useContext, useRef} from "react";
import {TableContext} from "./const.js";


export default function ({row, column}) {
    const injector = useContext(TableContext)

    const {cursor, setCursor, rows, columns} = injector

    const cellRef = useRef(null);

    const rowIndex = rows.indexOf(row);
    const columnIndex = columns.indexOf(column);

    const Cell = row[column.name]

    const onClick = () => {
        if (cellRef.current) {
            const width = cellRef.current.offsetWidth;
            const height = cellRef.current.offsetHeight;
            const top = cellRef.current.offsetTop;
            const left = cellRef.current.offsetLeft;

            setCursor({
                rowIndex,
                columnIndex,
                width,
                height,
                top,
                left,
            })
        }
    }

    return (
        <td
            onClick={onClick}
            ref={cellRef}
        >{Cell}</td>
    )
}