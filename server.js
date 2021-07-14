// A Node.js HTTP server that hosts everything under ./src


// You can change these settings if you need to
const settings = {
	ip: '127.0.0.1', // Same as 'localhost'
	port: 8080,

	redirects: {
		'/': '/app/'
	}
};


const http = require('http');
const pfs = require('fs/promises');


const mime_types = {
	'txt': 'text/plain',
	'manifest': 'application/manifest',
	
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',
	'jsx': 'application/javascript',

	'png': 'image/png',
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'ico': 'image/x-icon'
};


function get_path(req_url) {
	if(!req_url.startsWith('/')) req_url = '/' + req_url;

	let last_part = req_url.slice(req_url.lastIndexOf('/') + 1);

	// Default to the index.html page
	if(!last_part.includes('.')) {
		if(req_url.endsWith('/')) return req_url + 'index.html';
		else return req_url + '/index.html';
	}
	else return req_url;
}


function on_request(req, res) {
	if(req.method !== 'GET') {
		console.log("Bad request:", req.method + ' ' + req.url);

		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end("Bad request method, only GET is supported.");

		return;
	}

	if(req.url in settings.redirects) {
		res.writeHead(302, { 'Location': settings.redirects[req.url] });
		res.end();
		
		return;
	}

	const path = get_path(req.url);
	const ext = path.slice(path.lastIndexOf('.') + 1);
	const mime = mime_types[ext] ?? 'text/plain';

	pfs.readFile(`./src${path}`).then((data) => {
		res.writeHead(200, { 'Content-Type': mime });
		res.end(data);
	}).catch((err) => {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 Not Found');
	});
}


async function main() {
	const server = http.createServer(on_request);

	server.listen(settings.port, settings.ip);
	console.log(`Listening at http://${settings.ip}:${settings.port}`);
}

main();

