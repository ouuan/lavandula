const _ = require('lodash')
const fs = require('fs')
const YAML = require('yaml')

config = YAML.parse(fs.readFileSync('config.yml').toString())

fs.writeFileSync('dist/user.js', (() => {
	let result = ''
	result += '// ==UserScript==\n'
	_.each(config.tampermonkey, (val, key) => {
		if (val instanceof Array) {
			val.forEach(val => {
				result += `// @${key} ${val}\n`
			})
		} else {
			result += `// @${key} ${val}\n`
		}
	})
	result += '// ==/UserScript==\n'
	result += '// ==Notes==\n'
	_.each(config.notes, (val) => {
		result += `// ${val}\n`
	})
	result += '// ==/Notes==\n'
	result += fs.readFileSync('dist/bundle.js').toString()
	return result
})())