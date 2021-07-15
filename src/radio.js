import React from 'react';
import RadioButton from './radiob';

class RadioPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: this.props.selected
        }
    }

    handleChange = val => {
        this.setState({ selected: val });
    }

    createButton = val => {
        return <RadioButton
            onChange= {this.handleChange}
            selected={this.state.selected} // does this break anything? should it be props?
            value={val}
            panelName = {this.props.panelName}
        />
    }
    createRadioButtons = () => {
        return this.props.options.map(this.createButton);
    }

    render() {
        return (
            <div className="radioContainer">
                <h3>{this.props.panelName }</h3>
                {this.createRadioButtons()}
            </div>
        )
    }
}

export default RadioPanel