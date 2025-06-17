const { plugin, logger, pluginPath, resourcesPath } = require("@eniac/flexdesigner")

// Store key data
const keyData = {}

/**
 * Called when current active window changes
 * {
 *    "status": "changed",
 *    "oldWin": OldWindow,
 *    "newWin": NewWindow
 * }
 */
plugin.on('system.actwin', (payload) => {
    logger.info('Active window changed:', payload)
})

/**
 * Called when received message from UI send by this.$fd.sendToBackend
 * @param {object} payload message sent from UI
 */
plugin.on('ui.message', async (payload) => {
    logger.info('Received message from UI:', payload)
    return 'Hello from plugin backend!'
})

/**
 * Called when device status changes
 * @param {object} devices device status data
 * [
 *  {
 *    serialNumber: '',
 *    deviceData: {
 *       platform: '',
 *       profileVersion: '',
 *       firmwareVersion: '',
 *       deviceName: '',
 *       displayName: ''
 *    }
 *  }
 * ]
 */
plugin.on('device.status', (devices) => {
    logger.info('Device status changed:', devices)
})


/**
 * Called when a plugin key is loaded
 * @param {Object} payload alive key data
 * {
 *  serialNumber: '',
 *  keys: []
 * }
 */
plugin.on('plugin.alive', (payload) => {
    logger.info('Plugin alive:', payload)
    for (let key of payload.keys) {
      keyData[key.uid] = key
      if (key.cid === 'com.lucas_godfrey.flexpluginbg.counter') {
          keyData[key.uid].counter = parseInt(key.data.rangeMin)
          key.style.showIcon = false
          key.style.showTitle = true
          key.title = 'Click Me!'
          plugin.draw(payload.serialNumber, key, 'draw')
      }
    }
})


/**
 * Called when user interacts with a key
 * @param {object} payload key data 
 * {
 *  serialNumber, 
 *  data
 * }
 */
plugin.on('plugin.data', (payload) => {
    logger.info('Received plugin.data:', payload)
    const data = payload.data
    if (data.key.cid === "com.lucas_godfrey.flexpluginbg.counter") {
      const key = data.key
      key.style.showIcon = false
      key.style.showTitle = true
      keyData[key.uid].counter++
      if (keyData[key.uid].counter > parseInt(key.data.rangeMax)) {
          keyData[key.uid].counter = parseInt(key.data.rangeMin)
      }
      key.title = keyData[key.uid].counter.toString()
      plugin.draw(payload.serialNumber, key, 'draw')
    }
})

// Connect to flexdesigner and start the plugin
plugin.start()

// ---------------------------------------------------------------------------
// Baldur's Gate 3 log file monitor (macOS compatible)
// ---------------------------------------------------------------------------
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

// Default macOS log path for Baldur's Gate 3
const BG3_LOG_PATH = path.join(
  os.homedir(),
  'Library',
  'Application Support',
  'Larian Studios',
  "Baldur's Gate 3",
  'Player.log'
)

/**
 * Monitor the Player.log file for new entries. This does not require the
 * Script Extender and works with the standard macOS version of BG3.
 */
function watchBG3Logs(logPath = BG3_LOG_PATH) {
  logger.info(`Watching BG3 log: ${logPath}`)
  let lastSize = 0

  const readNewLines = () => {
    fs.stat(logPath, (err, stats) => {
      if (err) {
        if (err.code !== 'ENOENT') {
          logger.error('Error reading log file:', err.message)
        }
        return
      }
      if (stats.size > lastSize) {
        const stream = fs.createReadStream(logPath, {
          start: lastSize,
          end: stats.size - 1
        })
        stream.on('data', (chunk) => {
          const lines = chunk.toString().split(/\r?\n/).filter(Boolean)
          for (const line of lines) {
            logger.info(`[BG3] ${line}`)
          }
        })
        stream.on('end', () => {
          lastSize = stats.size
        })
      }
    })
  }

  fs.watchFile(logPath, { interval: 1000 }, readNewLines)
  // Initial read if file already exists
  readNewLines()
}

// Start watching the log file
watchBG3Logs()
