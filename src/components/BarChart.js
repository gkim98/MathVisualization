import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import * as d3 from 'd3';
import courses from '../data/courses';
import { connect } from 'react-redux';

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.getData = this.getData.bind(this);
    }

    /*
        filters data based on:
            1) start and end date
            2) by # of seats (generalize later)
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

        return seatsCount;
    }

    render() {
        console.log(this.props.filters.startYear)
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
        filters: state.filters  
    };
};

export default connect(mapStateToProps)(BarChart);