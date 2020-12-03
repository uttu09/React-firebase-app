import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles} from "@material-ui/core/styles";
import sidebarRoute from "../routes/Sidebar";

const drawerWidth = 280;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width : '100%'
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#fff !important",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "#152A5A",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width : '100%',
    position : 'relative',
    backgroundColor: "#2c7cb7",
    minHeight : '100vh'
  },
  listItemContainerActive: {
    color: "#fff",
    backgroundColor: '#084B7D',
      borderLeft: "4px solid #CCB613",
      "&:hover" : {
        color: "#fff",
        backgroundColor: '#084B7D',
        borderLeft: "4px solid #CCB613",
      },
    "& .listItemIcon": {
      minWidth: "35px",
      "& svg": {
        color: "#4871A0",
      },
    },
  },
  listItemContainerInActive: {
    color: "#fff",
    backgroundColor: 'transparent',
    "&:hover" : {
      color: "#fff",
      backgroundColor: '#084B7D',
      borderLeft: "4px solid #CCB613",
    },
  "& .listItemIcon": {
    minWidth: "35px",
    "& svg": {
      color: "#ffffff",
    },
  },
  },
  profileImage: {
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    marginTop: "6px",
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
  },
  toolBarIcon: {
    padding: "20px 0px 0px 40px",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  function getRoutes(routes) {
    return routes.map((data, key) => {
      if (data) {
        return (<ListItem
          id={data.name}
          button
          key={data.name}
          className={classes.listItemContainerInActive}
           onClick={() => {
            if(props.handleSidebarRouteClick) props.handleSidebarRouteClick(data)
          }}
        >
            <ListItemIcon className="listItemIcon">
              <data.icon />
            </ListItemIcon>
            <ListItemText primary={data.name} />
        </ListItem> )
      } 
    });
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.toolBarIcon}>
          <h3 style={{ color: "#fff", position: "relative", bottom: 8 }}>
         SENRYSA App
          </h3>
        </div>
      </div>
      <Divider />
      <List>{getRoutes(sidebarRoute)}</List>
    </div>
  );

  return (
    <React.Fragment>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}
