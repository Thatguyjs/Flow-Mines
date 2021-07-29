import React from 'react';

class ResetButton extends React.Component {
    /*
        required params:
        cHandle (function to push state up. needs to take event value as param.)
    */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleChange() {
        this.props.cHandle(this);
    }

    render() {
        return (
            <div className="ResetButton">
                <label className="settings-label">Settings Reset
                    <br/>
                    <input type="button" value="RESET" onClick={this.handleChange}/>
                </label>
            </div>
        )
    }
}

export default ResetButton;
