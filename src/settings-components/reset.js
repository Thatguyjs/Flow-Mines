import React from 'react';

class ResetButton extends React.Component {
    /*
        required params:
        cHandle (function to push state up. needs to take event value as param.)
    */
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    
    
    handleChange() {
        this.props.cHandle()
    }
    
    render() {
        return (
            <div className="ResetButton">
                <input type="button" value="RESET" onChange={this.handleChange }/>
            </div>
        )
    }
}

export default ResetButton;