import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import * as d3 from 'd3';
import courses from '../data/courses';
import { connect } from 'react-redux';

class ChildBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.getData = this.getData.bind(this);
    }

    /*
        filters data based on year clicked by parent chart

        CHANGE GET DATA FUNCTION
    */
    getData(startYear, endYear) {
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

        console.log(seatsCount)
        return seatsCount;
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
                        
                    />
                    <VictoryAxis
                        dependentAxis
                       
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
                    />
                </VictoryChart>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events  
    };
};

export default connect(mapStateToProps)(ChildBarChart);