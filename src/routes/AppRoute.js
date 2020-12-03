import React from "react";
import { BrowserRouter as Router,Switch ,Route} from "react-router-dom";
import history from "./history";
import HomePage from "../pages/HomePage";
import OrdersPage from "../pages/OrdersPage";
import StoresPage from "../pages/StoresPage";

export default function AppRoutes() {
  return (
    <Router history={history}>
      <Route path="/" exact component={()=> {
        window.location.href = "/home"
      }}/>
      <Route path="/home" exact component={HomePage} />
      <Route path="/orders" exact component={OrdersPage} />
      <Route path="/stores" exact component={StoresPage} />
    </Router>
  );
}
