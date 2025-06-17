# FlexPluginBG3

FlexPluginBG3 allows Baldur's Gate 3 information to be shown on your FlexBar device.

## Connection

This plugin tests connectivity with the Baldur's Gate 3 Script Extender. When
the game is started with the script extender and Lua debugger enabled, the
extender opens a TCP port (default `9998`). The plugin attempts to connect to
`127.0.0.1:9998` on startup and logs the result.

Ensure you have the Script Extender installed and the `EnableLuaDebugger` option
set to `true` in `ScriptExtenderSettings.json` before launching the game.

## Testing on macOS

1. Install Node 20 and the Flex CLI:

   ```bash
   npm install -g @eniac/flexcli
   ```

2. Install dependencies and build the plugin:

   ```bash
   npm install
   npm run build
   ```

3. Validate, link, and debug the plugin:

   ```bash
   npm run plugin:validate
   npm run plugin:link
   npm run plugin:debug
   ```

4. Launch Baldur's Gate 3 with the Script Extender and `EnableLuaDebugger` enabled.

5. Confirm that the plugin connects by checking the console logs.
