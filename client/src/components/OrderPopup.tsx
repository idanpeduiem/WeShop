import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Fab } from "@mui/material";
import { loadavg } from "os";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { Routes, useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";
import { saveOrder } from "../queries";
import Spinner from "../utils/spinner";

const OrderPopup: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);


   const onSuccess = () => {
     setIsSuccess(true);
     setTimeout(() => {
        navigate(RoutePaths.HOME);
     },700)
   }

    const onOrder =  () => {
      setIsLoading(true);
      saveOrder(address)
      .then(() => {
        setIsLoading(false);
        onSuccess();
        })
      .catch(() => setIsError(true))
    }

    const getDialogContent = () => {
        if(isLoading){
            return <Spinner/>;
        } else if(isError){
            return <h2> Something went wrong try again later</h2>
        } else if(isSuccess){
            return (
                <div style={{textAlign: 'center'}}>
                 <Fab
                 aria-label="save"
                 color="success"
                 >
                  <CheckIcon />
                 </Fab>
                </div>
            )
        } else {
            return (
                <>
               <DialogContentText>
                 Please enter your full address
               </DialogContentText>
               <TextField
                onChange={event => setAddress(event.target.value)}
                value={address}
                autoFocus
                margin="dense"
                id="name"
                label="Address"
                type="text"
                fullWidth
                variant="standard" />
             </>
            )
        }
    }

    return (
        <div>
        <Button onClick={() => setIsOpen(true)} variant={"contained"} fullWidth>
          Order now!
        </Button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogTitle>Delivery details</DialogTitle>
          <DialogContent>
            {getDialogContent()}
          </DialogContent>
          <DialogActions>
            <Button disabled={isSuccess} onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button disabled={address.length === 0 || isSuccess} onClick={onOrder}>Order</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default OrderPopup;