import { Request, Response } from 'express'
import { readFile } from 'fs/promises'
import createEndpoint from './createEndpoint'
import { lazyInitSlides } from './getSlides'
import { notFoundError } from '../common/errors'
import { Converter } from 'showdown'
import highlightCode from './highlightCode'

const converter = new Converter()

interface HtmlMap {
  [name: string]: string
}

const cache: HtmlMap = {}

type Substitution = Readonly<{
  index: number
  name: string
  length: number
}>

type Includes = Readonly<{
  [name: string]: string
}>

const getSubstitutions = (template: string): ReadonlyArray<Substitution> => {
  const substitutions: Substitution[] = []
  let index = 0
  while (true) {
    index = template.indexOf('{{', index)
    if (index < 0) {
      return substitutions.reverse()
    } else {
      const endIndex = template.indexOf('}}', index + 2)
      if (endIndex < 0) {
        throw new Error(`Mismatched start and end braces at index ${index}`)
      } else {
        const name = template.slice(index + 2, endIndex)
        substitutions.push({ index, name, length: name.length + 4 })
        index = endIndex + 2
      }
    }
  }
}

const read = async (partialPath: string): Promise<string> => readFile(`${__dirname}/slides/${partialPath}`, 'utf8')

const getIncludes = async (substitutions: ReadonlyArray<Substitution>): Promise<Includes> => {
  let includes: any = {}
  await Promise.all(substitutions.map(async ({ name }) => {
    includes[name] = highlightCode(name, await read(`includes/${name}`))
  }))
  return includes as Includes
}

const addIncludes = async (rawHtml: string): Promise<string> => {
  let result: string = rawHtml
  const substitutions = getSubstitutions(rawHtml)
  const includes = await getIncludes(substitutions)
  substitutions.forEach(({ name, index, length }) => {
    result = result.slice(0, index) + includes[name] + result.slice(index + length)
  })
  return result
}

const renderHtml = async (slideName: string): Promise<string> => {
  const html = converter.makeHtml(await read(slideName))
  return addIncludes(html)
}

const getHtml = async (slideName: string) => {
  const html = cache[slideName]
  if (html) {
    return html
  } else {
    const initHtml = await renderHtml(slideName)
    cache[slideName] = initHtml
    return initHtml
  }
}

export default createEndpoint(async ({ params: { name } }: Request, res: Response) => {
  const slides =  await lazyInitSlides()
  if (slides.includes(name)) {
    res.type('text/html').send(await getHtml(name))
  } else {
    throw notFoundError(`Slide '${name}' does not exist`)
  }
})

