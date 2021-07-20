import React from 'react';


class Card extends React.Component {
	render() {
		return (
			<div className={`card card-${this.props.layout}`}>
				<h2>{this.props.data.dayName}</h2>
				<div className="card-info">
					<div className="card-weather">
						<div><svg style={{width: "clamp(50px,4vw, 4vw)", height: "clamp(50px,4vw, 4vw)"} }><use href={`#icon-weather-${this.props.data.weather}`} /></svg></div>
						{this.props.layout === 'wide' ? <div style={{ flexGrow: "5" }}/> : ''}
						<div><span>{this.props.data.temp}</span></div>
					</div>
					<div style={{flexGrow: "20" }}/>
					<div className="card-schedule">
						<div><svg style={{ width: "clamp(20px, 1.3vw, 1.3vw)", height: "clamp(20px, 1.3vw, 1.3vw)" }}><use href="#icon-clock" /></svg></div>	
						<div><span>{this.props.data.startTime}</span></div>

						<div><svg style={{width: "clamp(20px, 1.3vw, 1.3vw)", height: "clamp(20px, 1.3vw, 1.3vw)"}}><use href="#icon-hourglass" /></svg></div>
						<div><span>{this.props.data.duration}</span></div>
					</div>
				</div>
			</div>
		);
	}
}


export default Card;

