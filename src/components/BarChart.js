import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import * as d3 from 'd3';
import courses from '../data/courses';
import { connect } from 'react-redux';
import { changeIsDisplayed, changeYearDisplayed, changeFeatureDisplayed } from '../actions/events';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    /*
        filters data based on:
            1) start and end date
            2) by # of seats (generalize later)
    */
    getData = (startYear, endYear) => {
        const yearFilteredData = courses.filter((course) => {
                return course.year >= startYear 
                && course.year <= endYear
            }
        )

        const seatsCount = d3.nest()
            .key((d) => (d.year))
            .rollup((v) => {
                return d3.sum(v, (c) => c.seats)
            })
            .entries(yearFilteredData);

        return seatsCount;
    }

    /*
        Victory Chart:
            - animate prop gives transition graph settings change
            - events:
                - mouse over a bar will change it's coloring

        specify an event key if you want to target other components
        create a map that creates victory bars for each feature
        each will have the same event
    */
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
                        label="Year"
                    />
                    <VictoryAxis
                        dependentAxis
                        label="# of Students"
                    />
                    <VictoryBar 
                        data={this.getData(this.props.filters.startYear, this.props.filters.endYear)}
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
                                // highlights bar that mouse is hovering over
                                onMouseOver: (props) => {
                                  return {  
                                    mutation: (props) => {
                                      return {style: {fill: 'tomato'}};
                                    }
                                  }
                                },
                                // removes highlight when mouse leaves
                                onMouseOut: () => {
                                  return {
                                    mutation: (props) => {
                                      return null;
                                    }
                                  }
                                },
                                // clicking on bar -> child bar chart for that year
                                onClick: () => {
                                  return {
                                    mutation: (props) => {
                                      const clickedYear = props.datum.x;
                                      this.props.dispatch(changeIsDisplayed(true));
                                      this.props.dispatch(changeYearDisplayed(clickedYear));
                                    }
                                  }
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

export default connect(mapStateToProps)(BarChart);