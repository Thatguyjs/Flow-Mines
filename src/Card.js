import React from 'react';
import Storage from './settings-components/storage.js';

class Card extends React.Component {

	dayName() {
		switch (this.props.layout) {
			case "narrow":
				return this.props.data.dayName.substring(0,2);
		
			default:
				return this.props.data.dayName
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

	render() {
		return (
			<div className={`card card-${this.props.layout}`} style={{background: this.getColor()}}>
				<h2>{this.dayName()}</h2>
				<div className="card-info">
					<div className="card-weather">
						<div><svg className = "largeIcon"><use href={`#icon-weather-${this.props.data.weather}`} /></svg></div>
						{this.props.layout === 'wide' ? <div style={{ flexGrow: "5" }}/> : ''}
						<div><span>{this.props.data.gTempStr(Storage.get("units"))}</span></div>
					</div>
					<div style={{flexGrow: "20" }}/>
					<div className="card-schedule">
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


export default Card;

