/*
    dashboard with UI
*/

import React from 'react';
import { connect } from 'react-redux';
import BarChart from './BarChart';
import MultipleLineChart from './MultipleLineChart';
import SettingsForm from './SettingsForm';
import StackedBarChart from './StackedBarChart';
import PieChart from './PieChart';
import Legend from './Legend';

const DashboardPage2 = (props) => {
    return (
        <div>
            <div className='flexh'>
                <div className='half-charts'>
                    <StackedBarChart />
                </div>
                <div className='flexc'>
                    <div className='flexh'>
                        <div className='half-charts'>
                            <PieChart/>
                        </div>
                        <div className='half-charts'>
                            <Legend />
                        </div>
                    </div>
                    <div className='white-placeholder'>
                        <SettingsForm className='form'/>
                    </div>
                </div>
            </div>
            
            {
                props.events.isDisplayed &&
                (<div className='flexh'>
                    <div className='third-white'>
                        <BarChart />
                    </div>
                    <div className='third-white'>
                        hi
                    </div>
                    <div className='third-white' id='right'>
                        hi
                    </div>
                </div>)
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        events: state.events  
    };
};

export default connect(mapStateToProps)(DashboardPage2);