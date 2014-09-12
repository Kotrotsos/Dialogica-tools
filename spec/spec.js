
var fs = require('fs');
var _ = require('lodash');
var colors = require('colors');

var file = process.argv[2] ;

if (file == undefined) { 
	console.log('Missing filename.\nUsage: node spec.js [filename] [erd|services]')
	return; 
}  else {
	if (process.argv[3] === "erd") {
		doGen(file,'erd');
	}  
	if (process.argv[3] === "services") {
		doGen(file,'services');
	}
}

function doGen (file,proc) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
	 
		data = JSON.parse(data);
 		
 		if (proc === "erd") {
 			_(data.erd).forEach(function(v) { 
				console.log(v.name.inverse); 	

				_(v.attributes).forEach(function(x,y){
					console.log("  " + y + ': ', x.red.italic.underline);
				})

				_(v.references).forEach(function(x,y) {
					if (typeof x === "object") {
						console.log("  .",y + ':' ,x.join(',').green);
						 
					} else {
						console.log("   ", y + ':' ,x.green);
					}
					
				});
				console.log(' ');
			});
 		}

 		if (proc === "services") {
 			_(data.services).forEach(function(v) { 
 				if (v.packageName == undefined) {
 					v.packageName = "";
 				}
 				if (v.version == undefined) {
 					v.version = "";
 				} else { v.version = "[" + v.version + "]" }
 				console.log(v.title.green, v.packageName, v.version.inverse)
 			});
 		}
	});
}

