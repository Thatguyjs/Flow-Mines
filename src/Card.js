import React from 'react';


class Card extends React.Component {
	render() {
		return (
			<div className={`card card-${this.props.layout}`}>
				<h2>{this.props.label}</h2>
				<div className="card-info">
					<div className="card-weather">
						<svg><use href={`icon-weather${this.props.weather}`} /></svg>
						<span>{this.props.temperature}</span>
					</div>
					<div className="card-schedule">
						<div className="card-time">
							<svg><use href="icon-clock" /></svg>
							<span>{this.props.startTime}</span>
						</div>
						<div className="card-duration">
							<svg><use href="icon-hourglass" /></svg>
							<span>{this.props.duration}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Card;

