import React from 'react';

class Settings {
    constructor(squareFootage, sprinklerFlow, mRainChance = 0.2, mRainAmt = 1, tempThresh, daySkip, displayFmt = "narrow", nAdvance, units = "imperial", textSize = "normal", rPeriod, notifDevices) {
        this.squareF = squareFootage;
        this.sprinklerFlow = sprinklerFlow;
        
        this.minRainChance = mRainChance;
        this.minRainAmt = mRainAmt;

        this.tempThresh = tempThresh;

        this.daySkip = daySkip;

        // 7 days displayed, no need for setting

        this.displayFmt = displayFmt;
        this.notifAdvance = nAdvance;
        this.notifDevices = notifDevices;

        this.units = units;

        this.textSize = textSize;
        this.refreshPeriod = rPeriod;
    }
}

class SettingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings: props.settings}
    }


}

// todo: radio button and toggle box.

class ToggleButton extends React.Component {

    /* 
        Props Required:
        - label (string)
        - isOn (bool)
        - handleChange(func) // shouldn't need to accept parameters, as it just needs to toggle the right thing in the class.

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

        this.props.handleChange()
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