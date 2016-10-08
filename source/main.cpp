#include <GarrysMod/Lua/Interface.h>
#include <cstdint>
#include <cstdlib>
#include <cstring>

GMOD_MODULE_OPEN( )
{
	system(
#ifdef _WIN32
		"runext\\run.cmd"
#else
		"./runext/run.sh"
#endif
	);
	return 0;
}

GMOD_MODULE_CLOSE( )
{
	
	return 0;
}
