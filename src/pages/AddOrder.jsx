import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Fab from "@material-ui/core/Fab";
import firebase from 'firebase';
import notify from "../common/Notify";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const store_list = [
    {name : 'Store 100', id : 'store_100'},
    {name : 'Store 200', id : 'store_200'},
    {name : 'Store 300', id : 'store_300'},
    {name : 'Store 400', id : 'store_400'},
    {name : 'Store 500', id : 'store_500'},
    {name : 'Store 600', id : 'store_600'},
    {name : 'Store 700', id : 'store_700'},
    {name : 'Store 800', id : 'store_800'},
    {name : 'Store 900', id : 'store_900'},
    {name : 'Store 1000', id : 'store_1000'}
];
const styles = (theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(2),
  },
  closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
  },
});

const DialogTitleCustom = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
      <DialogTitle disableTypography className={classes.root} style={{ backgroundColor: '#2C72B7', color: '#fff' }}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                  <CloseIcon />
              </IconButton>
          ) : null}
      </DialogTitle>
  );
});

export default class AddOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('orders');
    this.state = {
        displayModal : this.props.isOpen,
        formdata: {
          store_id: '',
          order_number: '',
          order_amount: null
        }
    }
}

handleClose = () => {
  if (this.props.handleModalClose) this.props.handleModalClose(false);
};

handleAddOrder = (e) => {
  e.preventDefault();
  const { store_id, order_number, order_amount } = this.state.formdata;
  this.ref.add({
    store_id,
     order_number,
    order_amount
  }).then(docRef => {
    notify("Order Added Successfully", "success");
      this.setState({
          displayModal : false,
          formdata: {
             store_id: '',
             order_number: '',
             order_amount: null
          },
      })
  })
      .catch(error => {
        notify(error.message, "danger");
          console.log("Error Occured ", error)
      })
}

handleValueChange = (e, name) => {
  let value = e.target.value;
  this.setState(prev => {
      return {
          ...prev,
          formdata: { ...prev.formdata, [name]: value }
      }
  })
}

  render() {
  return (
    <div>
      <Dialog open={this.state.displayModal} onClose={()=>this.handleClose()} aria-labelledby="form-dialog-title">
              <DialogTitleCustom id="customized-dialog-title" onClose={this.handleClose}>
                        Add Order
                </DialogTitleCustom>
        <DialogContent style={{maxWidth : 400}}>
            <FormControl style={{ minWidth: 300, margin: '10px' }}>
                <InputLabel id="demo-simple-select-label">Select Store</InputLabel>
                <Select
                    labelId="store-id-select-label"
                    id="store_id_lbl"
                    value={this.state.formdata.store_id}
                    onChange={(e) => this.handleValueChange(e, 'store_id')}
                  >
                    {store_list.map((item)=> 
                        (<MenuItem value={item.id}>{item.name}</MenuItem>)
                    )}
                </Select>
            </FormControl>

            <FormControl style={{ minWidth: 300, margin: '10px' }}>
                    <TextField 
                    id="standard-basic" 
                    label="Order Number" 
                    value={this.state.formdata.order_number}
                    onChange={(e) => this.handleValueChange(e, 'order_number')}/>
            </FormControl>

            <FormControl style={{ minWidth: 300, margin: '10px' }}>
                    <TextField 
                    id="standard-basic" 
                    label="Amount" 
                    value={this.state.formdata.order_amount}
                    onChange={(e) => this.handleValueChange(e, 'order_amount')}/>
            </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={(e) => this.handleAddOrder(e)} color="primary">
                  Add
          </Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );
}
}