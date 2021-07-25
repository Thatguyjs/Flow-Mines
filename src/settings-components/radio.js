import React from 'react';
import RadioButton from './radiob';
import { ToolTip, ToolTipBtn } from './tooltip';

class RadioPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: this.props.selected
        };

		this.props.cInit(this);
    }

    handleChange = val => {
        this.setState({ selected: val });

        this.props.cHandle(this, val);
        // need to push up?
    }

    createButton = val => {
        return <RadioButton
            cHandle={this.handleChange}
            selected={this.state.selected} // does this break anything? should it be props?
            value={val}
            panelName={this.props.panelName}
            key={val}
        />
    }
    createRadioButtons = () => {
        return this.props.options.map(this.createButton);
    }

    render() {
        return (
            <div className="RadioContainer">
                <h3>{this.props.panelName }</h3> <ToolTipBtn id={"tooltip-radio-" + this.props.name} text={this.props.desc }/>
                {this.createRadioButtons()}
            </div>
        )
    }
}

export default RadioPanel;
