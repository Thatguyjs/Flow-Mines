import React from 'react';

class SettingStorage {
	constructor(options={}) {
		this.zipCode = options.zipCode;

		this.squareFootage = options.squareFootage;
		this.sprinklerFlow = options.sprinklerFlow;

		this.minRainChance = options.minRainChance || 0.2;
		this.minRainAmt = options.minRainAmt || 1;

		this.tempThresh = options.tempThresh;

		this.daySkip = options.daySkip;
		this.daySkipAuto = options.daySkipAuto || true;

		// 7 days displayed, no need for setting

		this.displayFmt = options.displayFmt || "Narrow";
		this.notifAdvance = options.notifAdvance;
		this.notifDevices = options.notifDevices;

		this.units = options.units || "Imperial";
		this.timeFormat = options.timeFormat || "12 Hour";
		this.textSize = options.textSize || "Normal";

		this.refreshPeriod = options.refreshPeriod;
	}


	// Read all settings from localStorage
	#read() {
		let settings_str = localStorage.getItem('settings');

		if(!settings_str) return {};
		return JSON.parse(settings_str);
	}


	// Write a group of settings to localStorage
	#write(obj) {
		localStorage.setItem("settings", JSON.stringify(obj));
	}


	// Set / update a setting
	set(name, value) {
		if(!name in this) return; // Invalid setting name
		this[name] = value;
	}

	// Get a setting
	get(name) {
		return this[name];
	}


	// Load all settings from localStorage
	load() {
		let saved = this.#read();

		for(let s in saved) {
			this[s] = saved[s];
		}
	}


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

		this.#write(obj);
	}
}


export default SettingStorage;
