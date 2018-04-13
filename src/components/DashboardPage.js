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
import { getYearData } from '../helpers/dataFilters';

const DashboardPage = (props) => {
    return (<div className='dashboardParent'>
        <div className='settingsParent'>
            <SettingsForm />
            <SettingsList />
        </div>
        <div className='chartParent'>
            <BarChart />
            <LineChart />
        </div>
        <div className='childrenParent'>
            {props.events.isDisplayed && 
                <ChildBarChart 
                    getData={getYearData}
                    xlabel='Subject Group'
                    ylabel='# of Students'
                />
            }
            {props.events.isDisplayed &&
                <ChildBarChart 
                    getData={getYearData}
                    xlabel='Subject Group'
                    ylabel='% of Total Students'
                />
            }
        </div>
    </div>)
};

const mapStateToProps = (state) => {
    return {
        events: state.events  
    };
};

export default connect(mapStateToProps)(DashboardPage);