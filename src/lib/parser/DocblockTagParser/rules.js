// @tag: rule
const NAME = `<spaces><:name>`
const TYPES = '<spaces><:types>'
const DESC = '<spaces>?<:description>'
const NAME_DESC = `${NAME}${DESC}`
const TYPES_DESC = `${TYPES}${DESC}`
const TYPES_NAME = `${TYPES}${NAME}`
const TYPES_PARAM_DESC = `${TYPES}<spaces><name:param>${DESC}`
const TYPES_NAME_VALUE_DESC = `${TYPES_NAME}<spaces>?<:value>?${DESC}`
const PATHID = '<spaces><:pathid><eol>'
const EOL = '<eol>' // End Of Line

module.exports = {
  '@const': TYPES_NAME_VALUE_DESC,
  '@var': TYPES_NAME_VALUE_DESC,
  '@global': TYPES_NAME_VALUE_DESC,
  '@function': NAME_DESC,
  '@class': NAME_DESC,
  '@interface': NAME_DESC,
  '@method': NAME_DESC,
  '@param': TYPES_PARAM_DESC,
  '@property': TYPES_PARAM_DESC,
  '@return': TYPES_DESC,
  '@throws': TYPES_DESC,
  '@constructor': EOL,
  '@abstract': EOL,
  '@private': EOL,
  '@protected': EOL,
  '@public': EOL,
  '@ignore': EOL,
  '@author': DESC,
  '@license': DESC,
  '@copyright': DESC,
  '@example': DESC,
  '@deprecated': DESC,
  '@module': PATHID,
  '@exports': PATHID,
  '@callback': PATHID,
  '@extends': PATHID
}
