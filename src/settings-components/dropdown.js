import React from 'react';

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

    renderOption = val => {
        return (<option value={val} selected={this.state.selected.equals(val) } > {val}</option>)
    }
    
    renderOptions = () => {
        return this.props.options.map(this.renderOption)
    }

    handleChange = event => {
        this.setState({ isDisplayed: this.state.isDisplayed, selected: event.target.value })

        this.props.cHandle(event.target.value)
        // need to push up?
    }

    // HandleClick necessary?



    render() {
        // is this.props.tag necessary
        return (
            <div className = "Dropdown">
                <label className="settingsLabel">
                    {this.props.label}
                    <br/>
                    <select name={this.props.name} onChange={ this.handleChange}>
                        {this.renderOptions()}
                    </select>
                </label>
            </div>
        )
    }
}

export default Dropdown;
