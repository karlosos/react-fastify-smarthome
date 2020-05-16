const path = require('path')

/**
 * Transforms image with extension to basename.
 *
 * @returns basename of file
 */
module.exports = {
  process (filename) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  }
}
