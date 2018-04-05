import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DashboardPage from '../components/DashboardPage';
import PivotPage from '../components/PivotPage';
import Header from '../components/Header'

export default () => (
    <div>
        <Header />
        <BrowserRouter>
            <div className='parentComponent'>
                <Switch>
                    <Route path='/' component={DashboardPage} exact={true}/>
                    <Route path='/pivot' component={PivotPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    </div>
);
