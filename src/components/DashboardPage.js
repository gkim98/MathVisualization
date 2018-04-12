/*
    Parent component for the dashboard page
*/

import React from 'react';
import { connect } from 'react-redux';
import BarChart from './BarChart';
import ChildBarChart from './ChildBarChart';
import LineChart from './LineChart';
import SettingsForm from './SettingsForm';
import SettingsList from './SettingsList';
import { countByFeature } from '../helpers/dataFilters';

const DashboardPage = (props) => {
    console.log(props.events.isDisplayed)
    return (<div className='dashboardParent'>
        <div className='settingsParent'>
            <SettingsForm />
            <SettingsList />
        </div>
        <div className='chartParent'>
            <BarChart />
            <LineChart />
        </div>
        <div>
            {props.events.isDisplayed && <ChildBarChart getData={countByFeature}/>}
        </div>
    </div>)
};

const mapStateToProps = (state) => {
    return {
        events: state.events  
    };
};

export default connect(mapStateToProps)(DashboardPage);