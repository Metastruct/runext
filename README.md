# runext

## Features

 - Autoruns with Gmod
 - **TODO**: Autoclose
 - Extracts lzma files based on HTTP API
 - **TODO**: obj2mdl, etc
 - that's about it...
 
## Usage
```lua
http.Post('http://localhost:27099/decompress',{
		file = "cache/workshop/123123.cache"
},print,print)
```
 
