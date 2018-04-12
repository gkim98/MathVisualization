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
                        
                    />
                    <VictoryAxis
                        dependentAxis
                       
                    />
                    <VictoryBar 
                        data={this.props.getData(this.props.events.year)}
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
        filters: state.filters,
        events: state.events  
    };
};

export default connect(mapStateToProps)(ChildBarChart);