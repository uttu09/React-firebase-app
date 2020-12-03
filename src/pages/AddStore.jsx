import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { Card, FormControl, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";
import firebase from 'firebase';
import notify from "../common/Notify";

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

export default class AddStoreModal extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('stores');
        this.state = {
            displayModal : this.props.isOpen,
            mainState: 'initial',
            imageUploaded: 0,
            selectedFile: null,
            formdata: {
                store_name: '',
                lat: null,
                long: null
            }
        }
    }

    handleClose = () => {
        if (this.props.handleModalClose) this.props.handleModalClose(false);
    };

    handleUploadClick = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({ selectedFile: [reader.result] })
        }.bind(this);
        console.log(url); // Would see a path?

        this.setState({
            mainState: 'uploaded',
            selectedFile: event.target.files[0],
            imageUploaded: 1
        })

        console.log(event.target.files[0]);

        if (event.target.files[0]) {
            const uploadTask = firebase.storage().ref(`images/${event.target.files[0].name}`).put(this.state.selectedFile);
            uploadTask.on('state_changed', (snapshot) => { console.log('snapshot', snapshot) },
                (error) => { console.log('error', error); }
            )
            //,
            //()=> firebase.storage.ref('images').child(event.target.files[0].name).getDownloadURL().then(url=>{console.log('URL')}))
        }
    };

    renderUploadedState = () => {

        return (
            <React.Fragment>
                {/* <CardActionArea onClick={() => imageResetHandler()}> */}
                {/* <CardActionArea > */}
                <Card style={{ textAlign: 'center', display: 'flex' }}>
                    <img
                        width="100px"
                        height="100px"
                        className={''}
                        src={this.state.selectedFile}
                    />
                </Card>

                {/* </CardActionArea> */}
            </React.Fragment>
        );
    }

   handleAddStore = (e) => {
        e.preventDefault();
        const { store_name, lat, long } = this.state.formdata;
        this.ref.add({
                    store_name: store_name,
                    lat: lat,
                    long: long,
                    store_image: this.state.selectedFile
        }).then(docRef => {
            notify("Store Added Successfully", "success");
            this.setState({
                displayModal : false,
                formdata: {
                    store_name: '',
                    lat: null,
                    long: null
                },
                selectedFile : null
            })
        })
            .catch(error => {
                notify(error.message, "danger");
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
                <Dialog open={this.state.displayModal} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
                    <DialogTitleCustom id="customized-dialog-title" onClose={this.handleClose}>
                        Add Store
                     </DialogTitleCustom>
                    <DialogContent style={{ maxWidth: 370 }}>

                        <Grid container justify="center" alignItems="center">
                             <input
                                accept="image/*"
                                style={{display : 'none'}}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={(e) => this.handleUploadClick(e)}
                            />
                            <label htmlFor="contained-button-file">
                                <Fab component="span">
                                    <AddPhotoAlternateIcon />
                                </Fab>
                            </label>

                            {(this.state.mainState == "uploaded" &&
                                this.renderUploadedState())}
                        </Grid>

                        <FormControl style={{ minWidth: 300, margin: '10px' }}>
                            <TextField
                                id="store_name"
                                label="Store Name"
                                value={this.state.formdata.store_name}
                                onChange={(e) => this.handleValueChange(e, 'store_name')}
                            />
                        </FormControl>

                        <FormControl style={{ minWidth: 300, margin: '10px' }}>
                            <TextField
                                id="lat"
                                label="Latitude"
                                value={this.state.formdata.lat}
                                onChange={(e) => this.handleValueChange(e, 'lat')}
                            />
                        </FormControl>

                        <FormControl style={{ minWidth: 300, margin: '10px' }}>
                            <TextField
                                id="long"
                                label="Longitude"
                                value={this.state.formdata.long}
                                onChange={(e) => this.handleValueChange(e, 'long')}
                            />
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={(e) => this.handleAddStore(e)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}