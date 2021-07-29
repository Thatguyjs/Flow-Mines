import React from 'react';
import { ToolTip, ToolTipBtn } from './tooltip';

class Dropdown extends React.Component {
    /* 
        necessary:
        options (list of options)
        selected (specifies which of items in options is default)
        label (string)
        cHandle (function to push state up. needs to take event value as param.)
    */
    constructor(props) {
        super(props);
        this.state = { isDisplayed: false, selected: this.props.selected };
    }

	select(item) {
		this.setState({ isDisplayed: this.state.isDisplayed, selected: item});
		this.renderOptions();
	}

    renderOption = val => {
        return (<option value={val} key={val }>{val}</option>);
    }
    
    renderOptions = () => {
        return this.props.options.map(this.renderOption);
    }

    handleChange = event => {
        this.setState({ isDisplayed: this.state.isDisplayed, selected: event.target.value });

        this.props.cHandle(this, event.target.value);
    }



    render() {
        // is this.props.tag necessary
        return (
            <div className="Dropdown">
                <label className="settingsLabel">
                    {this.props.label} <ToolTipBtn id={"tooltip-dropdown-" + this.props.name} text={this.props.desc }/>
                    <br/>
                    <select name={this.props.name} onChange={this.handleChange} value={this.state.selected}>
                        {this.renderOptions()}
                    </select>
                </label>
            </div>
        )
    }
}

export default Dropdown;
