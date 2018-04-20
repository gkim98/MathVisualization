import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';
import { connect } from 'react-redux';
import { lineData } from '../helpers/getData';


class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    getData(year) {
        
    }

    render() {
        return (
            <div>
                <VictoryChart
                    animate={{duration: 500}}
                    theme={VictoryTheme.material}
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
                        data={lineData(this.props.events.aspect, this.props.filters.feature)}
                        x='key'
                        y='value'
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
        filters: state.filters,
        events: state.events  
    };
};

export default connect(mapStateToProps)(LineChart);