import React from 'react';

class ToolTip extends React.Component{
    constructor(props) {
        super(props);
        this.state = { visible: false}
    }

    render() {
        // let {state} = this;
        return (
            <div>
                {
                    this.state.visible ? (
                        <div className="tooltip-content"> {this.props.info}</div>
                    ) : null
                }
            </div>
            
        );
    }
    
    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    show() {
        this.setState({ visible: true })
    }

    hide() {
        this.setState({visible: false})
    }
        
}

class ToolTipBtn extends React.Component{
    // events = {}
    constructor(props) {
        super(props);
        this.state = { id: props.id, text: props.text}
        this.tooltip = React.createRef();
    }

    onMouseOver = e => {
        if (e.target != null) {
            this.tooltip.current.show();    
        }
    }

    onMouseOut = e => {
        this.tooltip.current.hide();
    }

    render() {
        return (
            <div className = "tooltip-spawner">
                <button type="tooltip-button" id={this.state.id} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                    <svg className="buttonSVG">
                        <use href="#info" />
                    </svg>
                </button>
                <ToolTip ref={this.tooltip} info={this.props.text }/>
            </div>)
    }
    componentDidMount (){

    }
}

export { ToolTip, ToolTipBtn}
