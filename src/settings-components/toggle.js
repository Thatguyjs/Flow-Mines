import React from 'react';
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
    }

    handleClick() {
        this.setState(prevState => (
            { isOn: !prevState.isOn }
        ));

        this.props.cHandle()
    }

    render() {
        return (
            <div className="CheckBox">
                <label className = "settingsLabel">
                    <input
                        type="checkbox"
                        value= {this.props.isOn} // will this break things?
                        checked = {this.state.isOn}
                        onChange={this.handleClick}
                        // className?
                    />
                    { this.props.label}
                </label>

            </div>
            
        )
    }

}

// todo: something for when changes haven't been saved?


export default ToggleButton;