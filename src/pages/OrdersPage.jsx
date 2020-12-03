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
import { Backdrop, CircularProgress, Grid } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

export default class OrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('orders');
    this.unsubscribe = null;
    this.state = {
      orders: [],
      loading : true
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  onCollectionUpdate = (querySnapshot) => {
    const orderList = [];
    querySnapshot.forEach(obj => {
      const { order_amount, order_number, store_id } = obj.data();
      orderList.push({
        key: obj.id,
        order_amount,
        order_number,
        store_id
      })
      this.setState({ 
        orders: orderList,
        loading : false
       })
    });
  }

  render() {
    let rows = this.state.orders;

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
                <StyledTableCell align="left">Order Amount</StyledTableCell>
                <StyledTableCell align="left">Order No.</StyledTableCell>
                <StyledTableCell align="left">Store ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.key}>
                  <StyledTableCell component="th" scope="row">
                    {row.key}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.order_amount}</StyledTableCell>
                  <StyledTableCell align="left">{row.order_number}</StyledTableCell>
                  <StyledTableCell align="left">{row.store_id}</StyledTableCell>
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
