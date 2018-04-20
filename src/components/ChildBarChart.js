import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';
import { connect } from 'react-redux';
import { childBarData } from '../helpers/getData';

class ChildBarChart extends React.Component {
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
                        text={`Breakdown for ${this.props.events.year}`}
                        dy={20}
                        dx={50}
                        style={{
                            fontSize: 15,
                            fontFamily: 'Verdana'
                        }}
                    />
                    <VictoryAxis
                        tickValues={[]}
                        style={{
                            tickLabels: {
                                angle: 45,
                                textAnchor: 'start'
                            },
                            grid: {
                                stroke: 'none'
                            }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryBar 
                        data={childBarData(this.props.events.year, this.props.filters.feature)}
                        x='key'
                        y='value'
                        style={{
                            data: {
                                fill: '#001A57'
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

export default connect(mapStateToProps)(ChildBarChart);