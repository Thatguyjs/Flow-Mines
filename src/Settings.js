import { Link } from "react-router-dom";

import './Settings.css';

import Storage from "./settings-components/storage.js";

import Dropdown from './settings-components/dropdown.js';
import RadioPanel from './settings-components/radio.js';
import ResetButton from './settings-components/reset.js';
import ToggleButton from './settings-components/toggle.js';
import ValueField from './settings-components/valuefield.js';

import React from "react";


// Name mapping, so components link to the correct setting
const settings_map = {
	"zip code": "zipCode",
	"square footage": "squareFootage",
	"flow rate": "sprinklerFlow",
	"temp. threshold": "tempThresh",
	"rain amt. threshold": "minRainAmt",
	"rain chance threshold": "minRainChance",
	"day skip": "daySkip",
	"auto": "daySkipAuto",
	"units": "units",
	"display": "displayFmt",
	"refresh period": "refreshPeriod",
	"time format": "timeFormat",
	"notification timing": "notifAdvance",
	"font size": "textSize"
};

const settings_descs = {
	/* SF : "(Non-Functional) Square feet in your lawn.", */
	Zip : "Zip Code is used to find weather data for your area, to calculate watering information.",
	FR : "Flow rate of your sprinkler head in gallons per minute",
	TempThresh : "If the weather is this temperature or higher do not water on this day.",
	RainAmtThresh : "If rain exceeeds this amount (inches per week), no watering is required. Otherwise, rainfall is removed from the target amount of watering.",
	RainChanceThresh : "(Non-Functional) If rain chance is over this value, then the predicted amount of rain counts towards the rain amount threshold.",
	WindThresh : "(Non-Functional) If wind speed is over this amount, do not water on that day.",
	Units : "Sets DISPLAY units only. Settings are all in Imperial units.",
	Display : "Sets Display Type for week.",
	TimeFmt : "Sets Time format for display.",
	FontSize : "Changes font size of text on the main page.",
	NonFunctional : "Not Implemented Yet."
}



class Settings extends React.Component {
	components_top = [
		{ type: ValueField, label: 'Zip Code', desc: settings_descs.ZipDesc},
		// { type: ValueField, label: 'Square Footage', desc: settings_descs.SF},
		{ type: ValueField, label: 'Flow Rate', desc: settings_descs.FR},
		{ type: ValueField, label: 'Temp. Threshold', desc: settings_descs.TempThresh},
		{ type: ValueField, label: 'Rain Amt. Threshold', desc: settings_descs.RainAmtThresh},
		{ type: ValueField, label: 'Rain Chance Threshold', desc: settings_descs.RainChanceThresh },
		// { type: ValueField, label: 'Day Skip', desc: settings_descs.NonFunctional},
		// { type: ToggleButton, label: 'Auto', isOn: true, desc: settings_descs.NonFunctional }
	];

	components_mid = [
		{ type: RadioPanel, panelName: 'Units', selected: 'Imperial', options: ['Imperial', 'Metric'], desc: settings_descs.Units },
		{ type: RadioPanel, panelName: 'Display', selected: 'Narrow', options: ['Wide', 'Narrow'], desc: settings_descs.Display },
		// { type: ValueField, label: 'Refresh Period', desc: settings_descs.NonFunctional },
		{ type: RadioPanel, panelName: 'Time Format', selected: '12 Hour', options: ['12 Hour', '24 Hour'], desc: settings_descs.TimeFmt },
		// { type: ValueField, label: 'Notification Timing', desc: settings_descs.NonFunctional }
	];

	components_bottom = [
		{ type: Dropdown, label: 'Font Size', selected: 'Normal', options: ['Small', 'Normal', 'Large'], desc: settings_descs.FontSize },
		{ type: ResetButton }
	];


	constructor(props) {
		super(props);

		for(let c in this.components_top) {
			this.components_top[c] = this._buildComponent(this.components_top[c]);
		}

		for(let c in this.components_mid) {
			this.components_mid[c] = this._buildComponent(this.components_mid[c]);
		}

		for(let c in this.components_bottom) {
			this.components_bottom[c] = this._buildComponent(this.components_bottom[c]);
		}
	}


	// Build a single component from a template-like object
	_buildComponent(template) {
		const type = template.type;
		delete template.type; // So the component doesn't receive it

		if(type === ValueField) {
			template.placeholder = template.label;
		}

		const setting = this._loadSettingFor(type, template);

		if(setting !== null) {
			template[setting[0]] = setting[1];
			template.key = setting[2];
		}
		else {
			template.key = 'ResetButton'; // Should be the only one without an associated setting
		}

		const component = React.createElement(type, {
			...template,
			cHandle: this.update.bind(this)
		});

		return component;
	}


	// Load a setting for a template
	_loadSettingFor(type, template) {
		const setting_name = template.label || template.panelName;
		if(!setting_name) return null;

		const setting = Storage.get(settings_map[setting_name.toLowerCase()]);

		if(type === ValueField) {
			return ['value', setting || '', setting_name];
		}
		else if(type === ToggleButton) {
			return ['isOn', setting, setting_name];
		}
		else if(type === RadioPanel || type === Dropdown) {
			return ['selected', setting, setting_name];
		}

		return null;
	}


	// Called when a component's value changes
	update(component, value) {
		if(component instanceof ResetButton) {
			localStorage.clear();
			window.location.reload();
			return;
		}

		const label = component.props.label || component.props.panelName;
		const setting_name = settings_map[label.toLowerCase()];

		Storage.set(setting_name, value);
		Storage.saveAll(); // Doesn't really affect performance, should be fine
	}


	render() {
		return ( <>
			<header>
				<Link id="nav-app" to="/" onClick = {() => { window.location.href = "/"; }}>
					<svg><use href="#icon-back" /></svg>
				</Link>

				<h1>Flow</h1>
			</header>

			<main id="main-settings">
				<div id="settings-container">
					<h3 id="settings-label">SETTINGS</h3>
					<div id="settings-top">
						{this.components_top}
					</div>
					<div id="settings-mid">
						{this.components_mid}
					</div>
					<div id="settings-bottom">
						{this.components_bottom}
					</div>
				</div>
			</main>
		</> );
	}
}


export default Settings;
