import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';
import { connect } from 'react-redux';
import { growthData } from '../helpers/getData';


class GrowthBarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <VictoryChart
                    domainPadding={20}
                    animate={{duration: 500}}
                    theme={VictoryTheme.material}
                >
                    <VictoryLabel
                        text={`% Growth for ${this.props.events.year}`}
                        dy={20}
                        dx={50}
                        style={{
                            fontSize: 15,
                            fontFamily: 'Verdana'
                        }}
                    />
                    <VictoryAxis
                        style={{
                            grid: {
                                stroke: 'none'
                            }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryBar horizontal
                        data={growthData(this.props.events.year, this.props.filters.feature)}
                        style={{
                            data: {
                                fill: '#001A57',
                                opacity: .25
                            }
                        }}
                        events={[
                            {
                                target: 'data',
                                eventHandlers: {
                                    onMouseOver: (props) => {
                                        return [{
                                            target: 'labels',
                                            mutation: (props) => {
                                                return {text: props.datum.y};
                                            }
                                        }]
                                    },
                                    onMouseOut: () => {
                                        return [{
                                            target: 'labels',
                                            mutation: (props) => {
                                                return null;
                                            }
                                        }]
                                    }
                                }
                            }
                        ]}
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

export default connect(mapStateToProps)(GrowthBarChart);