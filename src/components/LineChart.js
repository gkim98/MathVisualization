import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import * as d3 from 'd3';

import courses from '../data/courses';
import { connect } from 'react-redux';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    getData(year) {
        
    }

    render() {
        return (
            <div className='vicChart'>
                <VictoryChart
                    animate={{duration: 500}}
                >
                    <VictoryAxis
                        style={{
                            tickLabels: {angle: 45}
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryLine
                        data={this.getData(this.props.filters.startYear, this.props.filters.endYear)}
                        style={{
                            data: {
                                stroke: '#001A57'
                            }
                        }}
                    />
                </VictoryChart>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters  
    };
};

export default connect(mapStateToProps)(LineChart);