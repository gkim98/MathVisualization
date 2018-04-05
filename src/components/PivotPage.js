/*
    Page for the pivot table
*/

import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

const data = [['attribute', 'attribute2'], ['value1', 'value2']];

class PivotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <PivotTableUI 
                data={data}
                onChange={s => this.setState(s)}
                {...this.state}
            />
        );
    }
}

export default PivotPage;