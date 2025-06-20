import {Dialog, DialogContent} from "@mui/material";

export default function ({isOpen, setIsOpen}) {
  console.log()
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>Confirm Delete</DialogContent>
      <DialogContent>
        <span>Are you sure want to delete this employee?</span>
      </DialogContent>
    </Dialog>
  )
}
