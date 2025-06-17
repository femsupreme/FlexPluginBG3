#!/bin/bash
set -e

echo "FlexPluginBG3 Installer"

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20 or newer is required. Please install it from https://nodejs.org/ and rerun this installer." >&2
  exit 1
fi

# Check npm
if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Please install Node.js 20 or newer." >&2
  exit 1
fi

# Install flexcli if missing
if ! command -v flexcli >/dev/null 2>&1; then
  echo "flexcli not found. Installing globally..."
  npm install -g @eniac/flexcli
fi

echo "Installing dependencies..."
npm install

echo "Building plugin..."
npm run build

echo "Packaging plugin..."
npm run plugin:pack

echo "Installing plugin..."
npm run plugin:install

echo "Done! Launch your FlexBar software to try the plugin."
