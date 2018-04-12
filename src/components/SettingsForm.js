import React from 'react';
import { connect } from 'react-redux';
import { setStartYear, setEndYear, setFeature} from '../actions/filters';

/*
    component for configuring settings for the graphs
*/

class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        this.changeFilter = this.changeFilter.bind(this);
    }

    // click graph button -> will change settings of the graph
    changeFilter(e) {
        e.preventDefault();
        let startYear = document.getElementById('startYear').value;
        let endYear = document.getElementById('endYear').value;
        let feature = document.getElementById('feature').value;
        this.props.dispatch(setStartYear(startYear));
        this.props.dispatch(setEndYear(endYear));
        this.props.dispatch(setFeature(feature));
        console.log(startYear, endYear, feature);
    }

    render() {
        return (
            <div className='settings'>
                <form onSubmit={this.changeFilter}>
                <div className='sinput'>
                    Start Year <input type='text' id='startYear'/>
                </div>
                <div className='sinput'>
                    End Year <input type='text' id='endYear'/>
                </div>
                    Feature <select id='feature'>
                        <option value='subjectGroup'>Subject Group</option>
                        <option value='planGroup'>Plan Group</option>
                    </select>
                    <button type='submit' className='btn'>Graph</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters  
    };
};

export default connect(mapStateToProps)(SettingsForm);