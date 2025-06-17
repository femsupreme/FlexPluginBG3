# FlexPluginBG3

FlexPluginBG3 allows Baldur's Gate 3 information to be shown on your FlexBar device.

## Connection

This plugin tests connectivity with the Baldur's Gate 3 Script Extender. When
the game is started with the script extender and Lua debugger enabled, the
extender opens a TCP port (default `9998`). The plugin attempts to connect to
`127.0.0.1:9998` on startup and logs the result.

Ensure you have the Script Extender installed and the `EnableLuaDebugger` option
set to `true` in `ScriptExtenderSettings.json` before launching the game.

## Testing

This project requires **Node.js 20** or newer. Make sure Node 20 is installed
before running any npm scripts or tests.
