import Prism from 'prismjs'
import path from 'path'
import uniq from 'lodash/uniq'

const languagesByExtension: Readonly<{ [extension: string]: string }> = {
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.js': 'javascript',
  '.json': 'json'
}

const loadLanguages = require('prismjs/components/') as any
loadLanguages(uniq(Object.values(languagesByExtension)))

const getGrammarAndLanguage = (filename: string) => {
  const id = languagesByExtension[path.extname(filename)]
  if (id) {
    return {
      grammar: Prism.languages[id],
      language: id
    }
  } else {
    return { language: 'none'}
  }
}

export default (filename: string, code: string): string => {
  const { grammar, language } = getGrammarAndLanguage(filename)
  if (language == 'none') {
    console.log(`no language found for ${filename}`)
    return code
  } else {
    return `<div class='code'>${Prism.highlight(code, grammar!, language)}</div>`
  }
}
