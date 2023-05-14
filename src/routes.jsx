import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import UserEdit from "./pages/UserEdit";
import UserRegister from "./pages/UserRegister";
import RegisterPatient from "./pages/RegisterPatient";
import EditTerminal from "./pages/EditTerminal";
import ChoiceTerminalEdit from "./pages/EditTerminal/choiceTerminal";
import Monitoring from "./pages/Monitoring";
import ChoicePatientOnReports from "./pages/Reports/Choice";
import Report from "./pages/Reports/Report";
import RegisterTerminal from "./pages/RegisterTerminal";
import { isAuthenticated } from "./services/auth";
import Sidebar from "./components/Sidebar";
import {userHasAccessPermission} from "./services/permission";
import Footer from "./components/Footer";
import ListPatient from "./pages/ListTerminal";
import ChoiceRaspberryMonitoring from "./pages/ListRaspberry";
import RaspberryMonitoring from "./pages/MonitoringRaspberry";
import ChoiceRaspberryReport from "./pages/RaspberryReport/Choice";

/* Função destinada para possibilitar acesso somente as rotas com autenticação */
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const RoleRoute = ({ role, ...props }) => {
    return JSON.parse(localStorage.getItem("Permission")) === role
        ? <Route {...props} />
        : <Redirect to="/" />;
};

export default function Routes() {
    return (
        <Switch>
            {/* Rotas acessadas sem autenticação */}
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={() => <h1>SignUp</h1>} />
            <>
                {/*<Navbar/>*/}
                <Sidebar>
                    {/* Rotas acessadas somente com autenticação */}
                    <PrivateRoute path="/about" component={About}
                    />

                    <PrivateRoute
                        path="/registerterminal"
                        component={RegisterTerminal}
                    />
                    <PrivateRoute
                        path="/choice-patient-monitoring"
                        component={ListPatient}
                    />
                    <PrivateRoute path="/choice-module-monitoring" component={ChoiceRaspberryMonitoring} />
                    <PrivateRoute path="/monitoring-module/:moduleId" component={RaspberryMonitoring} />
                    <PrivateRoute
                        path="/choice-patient-reports"
                        component={ChoicePatientOnReports}
                    />
                    <PrivateRoute
                        path="/choice-terminal-edit"
                        component={ChoiceTerminalEdit}
                    />

                    <PrivateRoute
                        path="/choice-raspberry-reports"
                        component={ChoiceRaspberryReport}
                    />

                    <PrivateRoute
                        path="/edit-terminal/:terminalId"
                        component={EditTerminal}
                    />

                    <PrivateRoute path="/monitoring/:doctorId" component={Monitoring} />
                    <PrivateRoute path="/report/:doctorId" component={Report} />
                    <PrivateRoute path="/userregister" component={UserRegister} />
                    <PrivateRoute path="/useredit/:id" component={UserEdit} />
                </Sidebar>
            </>
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    );
}
