/*
    Parent component for the dashboard page
*/

import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import SettingsForm from './SettingsForm';

export default () => (
    <div className='dashboardParent'>
        <SettingsForm />
        <div className='chartParent'>
            <BarChart />
            <LineChart />
        </div>
    </div>
);