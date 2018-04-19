import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import { connect } from 'react-redux';
import { chooseData, yearFilter, yearTickLabels } from '../helpers/getData';
import { changeIsDisplayed, changeYearDisplayed, changeAspectDisplayed } from '../actions/events';

class StackedBarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    getData = () => {
        const fullData = chooseData(this.props.filters.feature);
        console.log(fullData);
        return yearFilter(
            this.props.filters.startYear,
            this.props.filters.endYear,
            fullData
        );
    }

    render() {
        console.log('stacked rerendered');
        return (
            <div>
                <VictoryChart 
                    domainPadding={20}
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
                                    events={[
                                      {
                                        target: 'data',
                                        eventHandlers: {
                                          onClick: () => {
                                            return {
                                              mutation: (props) => {
                                                console.log(props)
                                                console.log(featData['key'])
                                                const clickedYear = props.datum.x;
                                                this.props.dispatch(changeIsDisplayed(true));
                                                this.props.dispatch(changeYearDisplayed(clickedYear));
                                                this.props.dispatch(changeAspectDisplayed(featData['key']));
                                              }
                                            }
                                          }
                                        }
                                      }
                                    ]}
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