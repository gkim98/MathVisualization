/*
    Parent component for the dashboard page
*/

import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import SettingsForm from './SettingsForm';
import SettingsList from './SettingsList';

export default () => (
    <div className='dashboardParent'>
        <div className='settingsParent'>
            <SettingsForm />
            <SettingsList />
        </div>
        <div className='chartParent'>
            <BarChart />
            <LineChart />
        </div>
    </div>
);