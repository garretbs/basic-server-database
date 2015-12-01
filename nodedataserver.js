//v.002

var http = require('http');
var fs = require('fs');
var path = require('path');

var person = {firstName:"John", lastName:"Doe", age:20, eyeColor:"blue", 
			likes:["animals", "cars", "games"]};

			
var gameSystems = [
{name:"ATARI",title:"Atari",consoles:[
	{name:"A2600",title:"Atari 2600",year:"1977 (NA)"},
	{name:"A5200",title:"Atari 5200 SuperSystem",year:"1982 (NA)"},
	{name:"A7800",title:"Atari 7800 ProSystem",year:"1986 (NA)"},
	{name:"XEGS",title:"Atari XE Video Game System",year:"1988 (NA)"},
	{name:"LYNX",title:"Atari Lynx",year:"1989 (NA)"},
	{name:"JAGUAR",title:"Atari Jaguar",year:"1993 (NA)"},
	{name:"JAGUARCD",title:"Atari Jaguar CD",year:"1995 (NA)"}
]},
{name:"COMMODORE",title:"Commodore",consoles:[
	{name:"C64",title:"Commodore 64",year:"1982 (NA)"},
	{name:"CDTV",title:"Commodore CDTV",year:"1991 (NA)"},
	{name:"ACD32",title:"Amiga CD32",year:"1993 (EU)"}
]},
{name:"MICROSOFT",title:"Microsoft",consoles:[
	{name:"XBOX",title:"Xbox",year:"2001 (NA)"},
	{name:"XBOX360",title:"Xbox 360",year:"2005 (WW)"},
	{name:"XBOX1",title:"Xbox One",year:"2013 (NA)"}
]},
{name:"NEC",title:"NEC",consoles:[
	{name:"TG16",title:"TurbGrafx-16",year:"1987 (JP)"},
	{name:"SGX",title:"PC Engine SuperGrafx",year:"1989 (JP)"},
	{name:"TURBOD",title:"TurdoDuo",year:"1991 (JP)"},
	{name:"PCFX",title:"PC-FX",year:"1994 (JP)"}
]},
{name:"NINTENDO",title:"Nintendo",consoles:[
	{name:"NES",title:"Nintendo Entertainment System/Famicom",year:"1983 (JP)"},
	{name:"GB",title:"Game Boy",year:"1989 (JP)"},
	{name:"SNES",title:"Super Nintendo Entertainment System/Super Famicom",year:"1990 (JP)"},
	{name:"N64",title:"Nintendo 64",year:"1996 (JP)"},
	{name:"GBC",title:"Game Boy Color",year:"1998 (WW)"},
	{name:"GBA",title:"Game Boy Advance",year:"2001 (JP)"},
	{name:"GC",title:"GameCube",year:"2001 (JP)"},
	{name:"NDS",title:"Nintendo DS",year:"2004 (JP)"},
	{name:"WII",title:"Wii",year:"2006 (WW)"},
	{name:"3DS",title:"Nintendo 3DS",year:"2011 (WW)"},
	{name:"WIIU",title:"Wii U",year:"2012 (WW)"}
]},
{name:"PHILIPS",title:"Philips",consoles:[
	{name:"TELES",title:"Tele-Spiel",year:"1975 (EU)"},
	{name:"PODYSSEY",title:"Philips Odyssey",year:"1976 (NA)"},
	{name:"MAGODYSS",title:"Magnavox Odyssey",year:"1978 (EU)"},
	{name:"CDI",title:"Philips CD-i",year:"1991 (NA)"}
]},
{name:"SEGA",title:"Sega",consoles:[
	{name:"SG1000",title:"SG-1000",year:"1983 (JP)"},
	{name:"SG1000II",title:"SG-1000 II",year:"1984 (JP)"},
	{name:"SMS",title:"Master System",year:"1985 (JP)"},
	{name:"GENESIS",title:"Sega Genesis",year:"1988 (JP)"},
	{name:"SGG",title:"Sega Game Gear",year:"1990 (JP)"},
	{name:"SCD",title:"Sega CD",year:"1991 (JP)"},
	{name:"PICO",title:"Sega Pico",year:"1993 (JP)"},
	{name:"32X",title:"Sega 32X",year:"1994 (JP)"},
	{name:"SATURN",title:"Sega Saturn",year:"1994 (JP)"},
	{name:"DREAMCAST",title:"Dreamcast",year:"1998 (JP)"},
	{name:"APB",title:"Advanced Pico Beena",year:"2005 (JP)"}
]},
{name:"SNK",title:"SNK",consoles:[
	{name:"NEOG",title:"Neo Geo",year:"1990 (JP)"},
	{name:"NEOGCD",title:"Neo Geo CD",year:"1994 (JP)"}
]},
{name:"SONY",title:"Sony",consoles:[
	{name:"PS",title:"PlayStation",year:"1994 (JP)"},
	{name:"PS2",title:"PlayStation 2",year:"2000 (WW)"},
	{name:"PSP",title:"PlayStation Portable",year:"2004 (JP)"},
	{name:"PS3",title:"PlayStation 3",year:"2006 (JP)"},
	{name:"PSV",title:"PlayStation Vita",year:"2011 (JP)"},
	{name:"PS4",title:"PlayStation 4",year:"2013 (NA)"}
]}
];

http.createServer(function (request, response) {
    console.log('request starting...');
    
    var url = request.url;
    
    var parsedURL = require('url').parse(url, true);
    console.log(parsedURL);
    console.log(parsedURL.query.query);
    
    var contentType = 'text/html';
    
    
    
    if(parsedURL.pathname === "/json")
    {	
		var command = parsedURL.query.command;
		
		var operand = parsedURL.query.operand;
		
		console.log("COMMAND: " + command + ", " + operand);

		
		if(command === "get")
		{
			console.log("RESULT: " + JSON.stringify(gameSystems[operand]));
			
			response.writeHead(200, { 'Content-Type': contentType });
	
			response.end(JSON.stringify(gameSystems[operand]), 'utf-8');
		}
		else
		{			  
			console.error('Error running query');
			response.writeHead(500);
			response.end();
			return;
		};

    	return;
    };    
    
    
    // Handle requests to serve files.
    
	var filePath = '.' + request.url;
	
	if (filePath == './') filePath = './index.html';
		
	var extname = path.extname(filePath);
	
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.html':
			contentType = 'text/html';
			break;
	}
	
	fs.exists(filePath, function(exists) {
	
		if(exists) {
			fs.readFile(filePath, function(error, content) {
				if(error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
	
}).listen(8001);
console.log('Server running at http://127.0.0.1:8000/');
// http://localhost:8000/json?command=get&operand=age
// JSON.parse(jsonString);

