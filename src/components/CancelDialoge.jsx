import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Api from '../config/config';
import { useDispatch } from 'react-redux';
import { fetchUserReservations } from '../redux/reducers/user';
// import Draggable from 'react-draggable';
function PaperComponent(props) {
    return (

      <Paper {...props} />
   
  );
}

export default function CancelDialoge({open ,handleClose,url,id}) {
    const dispatch=useDispatch()
    function handleDelete(){
        handleClose()
        Api.delete(url+id)
        .then((res)=>dispatch(fetchUserReservations()))
        .catch((err)=>console.log(err.response.data))
      }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', }} id="draggable-dialog-title" >
                هل انت متأكد من الغاء هذا الحجز ؟
        </DialogTitle>
        <DialogActions style={{justifyContent:"space-around"}}>
          <Button onClick={handleDelete} variant='contained' color='error'>الغاء الحجز</Button>
          <Button autoFocus onClick={handleClose} color='primary' variant='outlined' >
            رجوع
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}