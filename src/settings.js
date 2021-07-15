import React from 'react';

class Settings {
    constructor(squareFootage, sprinklerFlow, mRainChance = 0.2, mRainAmt = 1, tempThresh, daySkip, displayFmt = "narrow", nAdvance, units = "imperial", textSize = "normal", rPeriod, notifDevices) {
        this.squareF = squareFootage;
        this.sprinklerFlow = sprinklerFlow;
        
        this.minRainChance = mRainChance;
        this.minRainAmt = mRainAmt;

        this.tempThresh = tempThresh;

        this.daySkip = daySkip;

        // 7 days displayed, no need for setting

        this.displayFmt = displayFmt;
        this.notifAdvance = nAdvance;
        this.notifDevices = notifDevices;

        this.units = units;

        this.textSize = textSize;
        this.refreshPeriod = rPeriod;
    }
}

class SettingsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings: props.settings}
    }

    
}