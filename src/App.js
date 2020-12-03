import React from 'react';
import './App.css';
import { Router } from "react-router-dom";
import History from "./routes/history";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import CommonLayout from "./common/CommonLayout";
import AppRoutes from "./routes/AppRoute";

export function App() {

    return (
      <Router history={History}>
         <ReactNotification />
          <CommonLayout>
            <AppRoutes />
          </CommonLayout>
      </Router>
    );
}


export default App;
