// Load icons from the icons.svg file

import icons from "./icons.svg";

(async function() {
	const response = await fetch(icons);
	const text = await response.text();

	document.getElementById('icon-container').innerHTML = text;
})();

