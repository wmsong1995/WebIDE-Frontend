const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const str = JSON.stringify
const commonConfig = require('./common.config.js')

const stylesheet = require('./stylesheet.config')
const uglify = require('./uglify.config')

module.exports = merge(
  commonConfig({
    mainEntryHtmlName: process.env.RUN_MODE ? 'workspace.html' : 'index.html',
    staticDir: process.env.RUN_MODE ? 'rs2' : 'rs',
  }),
  stylesheet(),
  uglify(),
  {
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: false,
        __RUN_MODE__: str(process.env.RUN_MODE || ''),
        __BACKEND_URL__: str(process.env.RUN_MODE ? process.env.BACKEND_URL : 'http://localhost:8080'),
        __WS_URL__: str(process.env.RUN_MODE ? process.env.WS_URL : ''),
        __PACKAGE_SERVER__: str(process.env.PACKAGE_SERVER || process.env.HTML_BASE_URL),
      }),
    ]
  }
)
