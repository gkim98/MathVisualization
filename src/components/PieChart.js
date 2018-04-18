import React from 'react';
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme, VictoryPie } from 'victory';
import { connect } from 'react-redux';
import { getPie } from '../helpers/getData';
import { setAspect } from '../actions/filters';

class PieChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('pie rerendered');
        return (
            <div>
                <h1 className='aspect'>{this.props.filters.aspect}</h1>
                <VictoryPie
                    data={getPie(this.props.filters.feature)}
                    x='key'
                    y='value'
                    theme={VictoryTheme.material}
                    labels={(d) => ''}
                    events={[
                        {
                          target: 'data',
                          eventHandlers: {
                            // displays the label of the sector
                            onMouseOver: (props) => {
                              return [{
                                  target: 'labels',
                                  mutation: (props) => {
                                    return {text: props.datum.y};
                                  }
                                },
                                {
                                    mutation: (props) => {
                                        const aspect = props.datum.x;
                                        this.props.dispatch(setAspect(aspect));
                                    }
                                }]
                            },
                            // removes the label of the sector
                            onMouseOut: () => {
                              return [{
                                    target: 'labels',
                                    mutation: (props) => {
                                        return null;
                                    }
                                },
                                {
                                    mutation: (props) => {
                                        this.props.dispatch(setAspect());
                                    }
                                }]
                            },
                            // clicking on bar -> disables the category and greys it out 
                            onClick: () => {
                              return [{
                                mutation: (props) => {
                                  return {style: {fill: '#808080'}};
                                }
                              }]
                            }
                          }
                        }
                      ]}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters  
    };
};

export default connect(mapStateToProps)(PieChart);