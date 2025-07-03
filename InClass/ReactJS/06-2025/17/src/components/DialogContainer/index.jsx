import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function ({isOpen, setIsOpen, children}) {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>New Employee</span>
                <CloseOutlinedIcon onClick={() => setIsOpen(false)}/>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions sx={{padding: '16px 20px'}}>
                <Button color='error' variant='outlined'>CANCEL</Button>
                <Button color='info' variant='contained'>SAVE</Button>
            </DialogActions>
        </Dialog>
    )
}