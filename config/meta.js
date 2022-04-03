const { readdir, mkdir, writeFile } = require('fs/promises')
const path = require('path')
const dayjs = require('dayjs')
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

class MetaInfoPlugin {
  constructor(options) {
    this.options = { filename: 'meta.json', ...options }
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, async stats => {
      const metaInfo = {
        // add any other information if necessary
        hash: stats.hash,
        lastDeployTime: now
      }
      const json = JSON.stringify(metaInfo, null, 2)
      const distPath = path.resolve(__dirname, '../dist')
      try {
        const dirInfo = await readdir(distPath)
        if (!dirInfo.length) {
          await mkdir(distPath)
        }
      } catch (e) {
        if (e) {
          await mkdir(distPath)
        }
      }
      return await writeFile(this.options.filename, json, 'utf8')
    })
  }
}

module.exports = MetaInfoPlugin
