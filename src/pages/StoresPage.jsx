import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from "../config/Config";
import { Avatar, Backdrop, CircularProgress, Grid } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledAvatar = withStyles((theme) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
}))(Avatar);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 30
  },
  table: {
    maxWidth: 700,
  },
});

export default class StoresPage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('stores');
    this.unsubscribe = null;
    this.state = {
      stores: [],
      loading : true
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (querySnapshot) => {
    const storesList = [];
    querySnapshot.forEach(obj => {
      const { store_name, lat, long,store_image } = obj.data();
      storesList.push({
        key: obj.id,
        store_name,
        lat,
        long,
        store_image
      })
      this.setState({
         stores: storesList ,
         loading: false
        })

    });
  }

  render() {
    let rows = this.state.stores;
    const { classes } = this.props

    return (
      <Grid style={{ padding: '30px', minHeight: '90vh' }}>
        {
           this.state.loading ?
            <Backdrop style={{ zIndex: 1000,color: '#fff'}} open={this.state.loading}>
               <CircularProgress color="#1c1c1c" />
           </Backdrop> :
        
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Store Name</StyledTableCell>
                <StyledTableCell align="left">Latitude</StyledTableCell>
                <StyledTableCell align="left">Longitude</StyledTableCell>
                <StyledTableCell align="left">Store Image</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.key}>
                  <StyledTableCell component="th" scope="row">
                    {row.key}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.store_name}</StyledTableCell>
                  <StyledTableCell align="left">{row.lat}</StyledTableCell>
                  <StyledTableCell align="left">{row.long}</StyledTableCell>
                  <StyledTableCell align="left">
                      <StyledAvatar  src={row.store_image} alt={row.store_name}/>
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
           }
      </Grid>
    );
  }
}
