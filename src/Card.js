import React from 'react';
import Storage from './settings-components/storage.js';
import { ToolTip } from './settings-components/tooltip.js';
const cardList = [];


class Card extends React.Component {

	constructor(props) {
		super(props);
		this.tooltip = React.createRef();
	}
	dayName() {
		switch (this.props.layout) {
			case "narrow":
				return this.props.data.dayName.substring(0,2);
		
			default:
				return this.props.data.dayName;
		}
	}

	getColor() {
		const t = this.props.data.temp
		var ret = [0,0,0]
		if (t >= 80) {
			ret[0] = 190;
			ret[1] = 50 - (t - 80);
			ret[2] = 50 - (t - 80);
		} /*else if (t >= 60) {
			ret[0] = 175;
			ret[1] = 150;
			ret[2] = 100 - 5* (t-60);
		}*/ else if (t >= 50) {
			ret[0] = (t - 50) * 6;
			ret[1] = 145 - 5 * (t - 50);
			ret[2] = 190 - 8 * (t - 50);
		} else {
			ret = [245,245,255, "25%"]
		}
		
		if (this.props.data.weather ==="rainy") {
			ret[0] = 30;
			ret[1] = 99;
			ret[2] = 190;
			ret[3] = "100%";
		}
		return "rgb(" + ret + ")";
	}

	// The order of this seems to be consistent, so this should be fine
	componentDidMount() {
		cardList.push(this);
	}

	getFontSizes(layout) {
		const font_size = Storage.get("textSize")
		const font_sizes = { 'Small': 0.5, 'Normal': 1, 'Large': 1.5 };
		const fontModifier = font_sizes[font_size];
		if (layout === "wide") {
			return ["calc(" + fontModifier + "*24px)","calc(" + fontModifier + "*48px)"]
		} else {
			return ["calc(" + fontModifier + "*1.4em)","calc(" + fontModifier + "*1.4em)"]
		}

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
		const fontSizes = this.getFontSizes(this.props.layout)
		return (
			<div className={`card card-${this.props.layout}`} style={{ background: this.getColor() }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >
				<ToolTip ref={this.tooltip} info={this.props.data.explanation }/>
				<h2 style={{ fontSize: fontSizes[0] }}>{this.dayName()}</h2>
				<div className="card-info">
					<div className="card-weather" style={{fontSize: fontSizes[1]} }>
						<div><svg className = "largeIcon"><use href={`#icon-weather-${this.props.data.weather}`} /></svg></div>
						{this.props.layout === 'wide' ? <div style={{ flexGrow: "5" }}/> : ''}
						<div><span>{this.props.data.gTempStr(Storage.get("units"))}</span></div>
					</div>
					<div style={{ flexGrow: "20" }} />
					<div style={{fontSize: fontSizes[0]} } className="card-schedule">
						<div><svg className = "smallIcon"><use href="#icon-clock" /></svg></div>	
						<div><span>{this.props.data.gTimeStr(Storage.get("timeFormat"))}</span></div>

						<div><svg  className = "smallIcon"><use href="#icon-hourglass" /></svg></div>
						<div><span>{this.props.data.duration}</span></div>
					</div>
				</div>
			</div>
		);
	}
}


export { Card, cardList };

