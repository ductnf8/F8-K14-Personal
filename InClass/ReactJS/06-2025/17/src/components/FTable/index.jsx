import {createContext, useContext} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const TableContext = createContext(null)

const Cell = ({row, column}) => {
  const injector = useContext(TableContext)
  const {onEdit} = injector

  return (
    <TableCell>
      {column.name === 'action'
        ? <>
            <ModeEditOutlineOutlinedIcon color={'success'} onClick={() => onEdit(row)}/>
            <DeleteOutlineOutlinedIcon color={'error'}/>
          </>
        : <span>{row[column.name]}</span>
      }
    </TableCell>
  )
}

const Row = ({row}) => {
  const injector = useContext(TableContext)
  const {columns} = injector

  return (
    <TableRow>
      {
        columns.map((col, index) => {
          return <Cell key={`f-table-cell-${row.id}-${col.name}`} row={row} column={col}/>
        })
      }
    </TableRow>
  )
}

export default function ({columns, rows, onEdit}) {
  const provider = {
    columns, rows, onEdit
  }

  return (
    <TableContext value={provider}>
      <TableContainer>
        <Table sx={{width: 800, margin: 'auto'}}>
          <TableHead>
            <TableRow>
              {
                columns.map((col) => {
                  return <TableCell sx={{fontWeight: 600}} key={col.name}>{col.text}</TableCell>
                })
              }
            </TableRow>
          </TableHead>

          <TableBody>
          {
            rows.map((row) => {
              return <Row key={`f-table-row-${row.id}`} row={row}/>
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    </TableContext>
  )
}