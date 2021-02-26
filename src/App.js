import './App.css';
import React from 'react';
import {Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Home}  from "./component/Home";

import Login from "./component/Login";
import UserCases  from "./casestudy/pages/UserCases";
import MainNavigation from './component/Navigation/MainNavigation';
import Cases from "./casestudy/pages/Cases";

import CaseStudyForm from "./component/CaseStudyForm";
import IndividualCaseStudy from "./casestudy/pages/IndividualCaseStudy";
import {EditCaseStudy} from "./casestudy/pages/EditCaseStudy";
import Logout from "./component/Logout";
export default App;



function App() {
    const [token, setToken] = React.useState('');
    let token1 = localStorage.getItem('login-token');
    if(!token1) {
        return <Login setToken={setToken}/>
    }

    return (
            <Router>
                <div>
                <MainNavigation />
                <main>
                    <Switch>
                        {/*Route to the Home component*/}
                        <Route path="/" exact>
                            <Home />
                        </Route>

                       {/*Route to the Create case study component*/}
                                           <Route path="/create" exact>
                            <CaseStudyForm />
                        </Route>
                         <Route path="/indiView/:CaseId" component={IndividualCaseStudy} />
                        <Route path="/EditCaseStudy/:CaseId" component={EditCaseStudy}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/Cases" component={Cases}/>
                        <Route path="/login" component={Login}/>


                        {/*Route to the UserCases component*/}
                        <Route path="/mycases" exact>
                            <UserCases />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
