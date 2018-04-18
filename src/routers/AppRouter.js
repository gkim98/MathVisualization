import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DashboardPage2 from '../components/DashboardPage2';
import PivotPage from '../components/PivotPage';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default () => (
    <div>
        <BrowserRouter>
            <div className='parentComponent'>
                <Switch>
                    <Route path='/' component={DashboardPage2} exact={true}/>
                    <Route path='/pivot' component={PivotPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    </div>
);
