#!/bin/sh
set -eu
rm -rf dist
mkdir -p dist
cp index.html styles.css app.js content.js favicon.svg manus-routes.json dist/
