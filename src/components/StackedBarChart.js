import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import { connect } from 'react-redux';
import { chooseData, yearFilter, yearTickLabels } from '../helpers/getData';

class StackedBarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    getData = () => {
        const fullData = chooseData(this.props.filters.feature);

        return yearFilter(
            this.props.filters.startYear,
            this.props.filters.endYear,
            fullData
        );
    }

    render() {
        console.log('stacked rerendered');
        console.log(yearTickLabels(
            this.props.filters.startYear,
            this.props.filters.endYear
        ));
        return (
            <div>
                <VictoryChart 
                    domainPadding={20}
                    animate={{duration: 500}}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        tickValues={yearTickLabels(
                            this.props.filters.startYear,
                            this.props.filters.endYear
                        )}
                        style={{
                            tickLabels: {angle: 45},
                            grid: {
                                stroke: 'none'
                            }
                        }}
                        
                    />
                    <VictoryAxis
                        dependentAxis
                    />
                    <VictoryStack>
                    {
                        this.getData().map((featData) => {
                            return (
                                <VictoryBar
                                    data={featData.values}
                                    x='key'
                                    y='value'
                                    key={featData['key']}
                                />
                            )
                        })
                    }
                    </VictoryStack>
                </VictoryChart>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        events: state.filters
    };
};

export default connect(mapStateToProps)(StackedBarChart);