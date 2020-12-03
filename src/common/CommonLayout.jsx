import React ,{ useState , useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";
import { Button, Grid } from "@material-ui/core";
import AddOrderModal from "../pages/AddOrder";
import AddStoreModal from "../pages/AddStore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar:  {
    backgroundColor : '#1c1c1c',
   height : 65,
   padding : '15px 20px'
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#E8E8E8",
  },
}));

export function CommonLayout(props) {

 const classes = useStyles();
  const [popupType,setPopupType] = useState('');
  const [storePopup,setStorePopup] = useState(false);
  const [orderPopup,setOrderPopup] = useState(false);

   const handleSidebarRoute = (data) => {
    if(data.path) {
      window.location.href = data.path;
    }    
    else {
      setPopupType(data.name);
      if(data.name == "Create Order") {
        setOrderPopup(true)
      }
      else if(data.name == "Create Store") {
        setStorePopup(true)
      }
    } 
  }

  const handleModalClose = (type) => {
    if(type == "Create Order") {
      setOrderPopup(false)
    }
    else if(type == "Create Store") {
      setStorePopup(false)
    }
  }

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <Grid md={3} lg={3}>
      <Navbar handleSidebarRouteClick={(data)=>handleSidebarRoute(data)}/>
      </Grid>
      <Grid md={9} lg={9} style={{position : 'relative'}}>
      <main className={classes.content}>
        <div className={classes.toolbar}>
        <Button variant="contained" color="secondary"  onClick={()=>(window.location.href = '/home')}>
            Home
      </Button>
        </div>
        {props.children}
      </main>
      </Grid>
      {(orderPopup && popupType == 'Create Order') && 
        <AddOrderModal 
            isOpen={orderPopup}
            handleModalClose={()=>handleModalClose(popupType)}
        />
      }
       {(storePopup && popupType == 'Create Store') && 
        <AddStoreModal 
            isOpen={storePopup}
            handleModalClose={()=>handleModalClose(popupType)}
        />
      }
    </Grid>
  );
}

export default CommonLayout;