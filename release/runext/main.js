if (!('toJSON' in Error.prototype))
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true,
    writable: true
});


var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var lzma = require('lzma-native');
var sanitize = require("sanitize-filename");

app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html', 'cache-control': 'max-age=0, no-cache, no-store, must-revalidate' });
	res.end('GMod External Helper');
});

app.post('/decompress', function(req, res){
    console.dir(req.body);
	var filepath = path.normalize(req.body.file);
	filepath = path.parse(filepath);
	filepath.base = sanitize(filepath.base);
	
	var sent_err = false;
	function handle_err(a,b) {
		if (sent_err) return;
		sent_err = true;
		res.writeHead(a, {'Content-Type': 'application/json', 'cache-control': 'max-age=0, no-cache, no-store, must-revalidate' });
		res.end(JSON.stringify(b));		
	}
	
	if (path.isAbsolute(filepath.dir) || (filepath.dir.indexOf("..") > -1) ) {
		return handle_err(400,{"error": "no escaping gmod"});
	};
	
	filepath = path.join(filepath.dir,filepath.base);
	
	
	var compressor = lzma.createDecompressor();
	var input = fs.createReadStream(filepath);
	//input.on('error', function (error) { return handle_err(400,error);});
	//input.on('readable', function () {
		
		var output = fs.createWriteStream(filepath+'.decompressed');
	
		input.pipe(compressor)/*.setMaxListeners(0).on('error', function(error){ 
			return handle_err(400,error);
		})*/.pipe(output)/*.setMaxListeners(0).on('error', function(error){
			return handle_err(400,error);
		})*/.on('finish', () => {
			if (sent_err) return;
			res.writeHead(200, {'Content-Type': 'text/html', 'cache-control': 'max-age=0, no-cache, no-store, must-revalidate' });
			res.end('done');
		});
		
	//});
	
});

port = 27099;
app.listen(port);