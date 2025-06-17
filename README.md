# FlexPluginBG3

FlexPluginBG3 allows Baldur's Gate 3 information to be shown on your FlexBar device. The
current test build targets **macOS** and does not include any Windows specific
dependencies.

## Easy Install (macOS)

1. Install Node 20 or newer from [nodejs.org](https://nodejs.org).
2. Download or clone this repository.
3. Open Terminal and run `./install.sh` inside the project folder.

The installer will build and install the plugin. Launch FlexBar when it finishes.


## Connection

This plugin monitors the Baldur's Gate 3 `Player.log` file to detect game
activity. No Script Extender is required. On macOS the log is located at:

```
~/Library/Application Support/Larian Studios/Baldur's Gate 3/Player.log
```

When the log file is updated, new lines are printed to the plugin console.

## Testing

This project requires **Node.js 20** or newer. Make sure Node 20 is installed
before running any npm scripts or tests.

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

4. Launch Baldur's Gate 3.

5. Confirm that the plugin reports log lines in the console.
