RunExt
===============

(*Because we already have enough lag inside GMod. It's time to offload*)  
An external runner for Garry's Mod. since we don't want to trigger VAC or spawn crashing threads.



## Features

 - Extracts lzma files based on HTTP API  

 - Autoruns with Gmod
 - **TODO**: Autoclose too
 - **TODO**: obj2mdl, etc
 - that's about it...
 - 99% VAC safe. Even the binary module gets unloaded that autostarts the external system.
 
## Usage
```lua
http.Post('http://localhost:27099/decompress',{
		file = "cache/workshop/123123.cache"
},print,print)
```

## Dependencies

 - [NodeJS v6](https://nodejs.org)
 - [lzma-native](https://github.com/addaleax/lzma-native)
 - express js and other stuff

## Installation

Just copy files around properly to GarrysMod root, run ```npm install``` and stuff.
