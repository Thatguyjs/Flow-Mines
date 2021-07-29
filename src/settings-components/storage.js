import React from 'react';


const Storage = {
	zipCode: null,

	squareFootage: null,
	sprinklerFlow: null,

	minRainChance: 0.2,
	minRainAmt: 1,

	tempThresh: null,

	daySkip: null,
	daySkipAuto: true,

	// 7 days displayed, no need for setting

	displayFmt: "Narrow",
	notifAdvance: null,
	notifDevices: null,

	units: "Imperial",
	timeFormat: "12 Hour",
	textSize: "Normal",

	refreshPeriod: null,


	// Read all settings from localStorage
	_read() {
		let settings_str = localStorage.getItem('settings');

		if(!settings_str) return {};
		return JSON.parse(settings_str);
	},


	// Write a group of settings to localStorage
	_write(obj) {
		localStorage.setItem("settings", JSON.stringify(obj));
	},


	// Set / update a setting
	set(name, value) {
		if(!(name in this)) return; // Invalid setting name
		this[name] = value;
	},

	// Get a setting
	get(name) {
		return this[name];
	},


	// Load all settings from localStorage
	load() {
		let saved = this._read();

		for(let s in saved) {
			this[s] = saved[s];
		}
	},


	// Save all settings to localStorage
	saveAll() {
		let obj = {
			"zipCode": null,
			"squareFootage": null,
			"sprinklerFlow": null,
			"tempThresh": null,
			"minRainAmt": null,
			"minRainChance": null,
			"daySkip": null,
			"daySkipAuto": null,
			"units": null,
			"displayFmt": null,
			"refreshPeriod": null,
			"timeFormat": null,
			"notifAdvance": null,
			"textSize": null
		};

		for(let name in obj) {
			obj[name] = this[name];
		}

		this._write(obj);
	}
}


Storage.load();
export default Storage;
