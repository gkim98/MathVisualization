import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';

import { connect } from 'react-redux';
import { chooseData } from '../helpers/getData';

class MultipleLineChart extends React.Component {
    constructor(props) {
        super(props);
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
                    {
                        chooseData(this.props.filters.feature).map((featData) => {
                            return (
                                <VictoryLine 
                                    data={featData}
                                    x='key'
                                    y='value'
                                    key={featData['key']}
                                />
                            )
                        })
                    }
                </VictoryChart>
            </div>
        );
    }
}

// dictates data retrieval based on user settings
const mapStateToProps = (state) => {
    return {
        filters: state.filters  
    };
};

export default connect(mapStateToProps)(MultipleLineChart);