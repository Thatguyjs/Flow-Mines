import React from 'react';
import { ToolTip, ToolTipBtn } from './tooltip';

class ValueField extends React.Component {
    /*
        required params:
        value (initial value)
        label (name)
        cHandle (change handler to push state up. needs to take event value as param.)
    */
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };

    }
    

    handleChange = event => {
        this.setState({value: event.target.value})

        // need to push up?
        this.props.cHandle(event.target.value)
        
    }

    // HandleClick necessary?



    render() {
        return (
            <div className = "ValueField">
                <label className="settingsLabel">
                    {this.props.label} <ToolTipBtn id={"tooltip-value-" + this.props.name} text={this.props.desc }/>
                    <br/>
                    <input type= "number" onChange={this.handleChange} placeholder={this.props.value} />
                </label>
            </div>
        )
    }
}

export default ValueField;
