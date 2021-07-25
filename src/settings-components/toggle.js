import React from 'react';
import { ToolTip, ToolTipBtn } from './tooltip';

class ToggleButton extends React.Component {

    /* 
        Props Required:
        - label (string)
        - isOn (bool)
        - cHandle(func) // shouldn't need to accept parameters, as it just needs to toggle the right thing in the class.

        If necessary, could have some small changes for a multi-tick system.
    */
    constructor(props) {
        super(props);
        this.state = { isOn: this.props.isOn };

        this.handleClick = this.handleClick.bind(this);

		this.props.cInit(this);
    }

    handleClick() {
        this.setState((prevState) => {
			this.props.cHandle(this, !prevState.isOn);
			return { isOn: !prevState.isOn };
        });
    }

    render() {
        return (
            <div className="CheckBox">
                <label className="settingsLabel">
                    <input
                        type="checkbox"
                        value={this.props.isOn} // will this break things?
                        checked={this.state.isOn}
                        onChange={this.handleClick}
                        // className?
                    />
                    {this.props.label} <ToolTipBtn id={"tooltip-toggle-" + this.props.name} text={this.props.desc }/>
                </label>

            </div>
            
        )
    }

}

// todo: something for when changes haven't been saved?


export default ToggleButton;
