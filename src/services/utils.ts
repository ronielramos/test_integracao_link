import convert from 'xml-js'

export const toXML = (json: Object) => convert.js2xml(json, { compact: true, spaces: 2 })
export const toJson = (xmlString: string) => convert.xml2js(xmlString, { compact: true })
