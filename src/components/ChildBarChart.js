import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { connect } from 'react-redux';

class ChildBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className='vicChart'>
                <VictoryChart 
                    domainPadding={20}
                    animate={{duration: 500}}
                >
                    <VictoryAxis
                        tickValues={[]}
                        style={{
                            tickLabels: {angle: 45}
                        }}
                        label={this.props.xlabel}
                    />
                    <VictoryAxis
                        dependentAxis
                        label={this.props.ylabel}
                    />
                    <VictoryBar 
                        data={this.props.getData(this.props.events.year, this.props.filters.feature)}
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
                                // gives y value
                                onMouseOver: (props) => {
                                  return [{
                                      target: 'labels',
                                      mutation: (props) => {
                                        return {text: props.datum.y};
                                      }
                                    }]
                                },
                                // removes y value
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