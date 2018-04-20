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
                    <VictoryLabel
                        text={`Seats vs. Year (${this.props.events.aspect})`}
                        dy={20}
                        dx={50}
                        style={{
                            fontSize: 15,
                            fontFamily: 'Verdana'
                        }}
                    />
                    <VictoryAxis
                        style={{
                            tickLabels: {angle: 45}
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryLine
                        data={lineData(this.props.events.aspect, this.props.filters.feature, this.props.filters.startYear, this.props.filters.endYear)}
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