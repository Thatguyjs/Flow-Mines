// Load icons from the icons.svg file

(async function() {
	'use strict';

	const response = await fetch('./icons.svg');
	const text = await response.text();

	document.getElementById('icon-container').innerHTML = text;
})();
