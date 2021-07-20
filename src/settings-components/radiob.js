import React from 'react';

class RadioButton extends React.Component{
    /* 
        This is only a single button within a setting featuring other options.

        Required Props:
        - onChange(func)
        - selected (string)
        - value (string)
        - panelName (string)
    */
    
    // will inclusion of selected in constructor screw with whether the rendered element thinks it's checked?
    // what does event actually mean?
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const isSelected = (this.props.selected === this.props.value);
        return (
            <div className="radioElement">
                <label className = "settingsLabel">
                    <input
                        type="radio"
                        name={this.props.panelName}
                        value={this.props.value}
                        checked={isSelected}
                        onChange={this.handleClick}
                        // className?
                    />
                    {this.props.value}
                </label>
            </div>
        )
    }
}

export default RadioButton;
