const fs = require('fs')
const jsyaml = require('js-yaml')
const nightmare = require('./nightmare')

const readFile = (path) => fs.readFileSync(path, { encoding: 'utf-8' })

const config = jsyaml.load(readFile('scripts/config.yml'))
const result = readFile('README.md').split('---')
const article = {
  meta: jsyaml.load(result[1]),
  content: result.slice(2).join('---')
}

const { jianshu, segmentfault, zhihu, v2ex, juejin, oschina } = config.accounts

// require('./jianshu')(nightmare, jianshu, article)
// require('./segmentfault')(nightmare, segmentfault, article)
// require('./v2ex')(nightmare, v2ex, article)
// require('./juejin')(nightmare, juejin, article)
require('./oschina')(nightmare, oschina, article)

