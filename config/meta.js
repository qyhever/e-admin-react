const fs = require('fs')
const dayjs = require('dayjs')
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

class MetaInfoPlugin {
  constructor(options) {
    this.options = { filename: 'meta.json', ...options }
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, stats => {
      const metaInfo = {
        // add any other information if necessary
        hash: stats.hash,
        lastDeployTime: now
      }
      const json = JSON.stringify(metaInfo, null, 2)
      return new Promise((resolve, reject) => {
        fs.writeFile(this.options.filename, json, 'utf8', error => {
          if (error) {
            reject(error)
            return
          }
          resolve()
        })
      })
    })
  }
}

module.exports = MetaInfoPlugin
