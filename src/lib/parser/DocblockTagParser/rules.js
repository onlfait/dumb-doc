// @tag: rule
// const EOL = '<eol>' // End Of Line
// const PATHID = '<spaces>{<path:pathid>}<eol>'
// const TYPES_DESC = '<spaces>{<types:id>}<spaces>?<description:any>'
// const TYPES_NAME_DESC =
//   '<spaces>{<types:ids>}<spaces><name:id><spaces>?<description:any>'
const NAME_DESC = '<spaces><name:id><spaces>?<description:any>'
const TYPES_NAME_VALUE_DESC =
  '<spaces><:types><spaces><name:id><spaces>?<:value>?<spaces>?<:description>'
const TYPES_PARAM_DESC =
  '<spaces><:types><spaces><name:param><spaces>?<description:any>'

module.exports = {
  '@const': TYPES_NAME_VALUE_DESC,
  '@var': TYPES_NAME_VALUE_DESC,
  '@global': TYPES_NAME_VALUE_DESC,
  '@function': NAME_DESC,
  '@class': NAME_DESC,
  '@interface': NAME_DESC,
  '@method': NAME_DESC,
  '@param': TYPES_PARAM_DESC
  // '@return': TYPES_DESC,
  // '@throws': TYPES_DESC,
  // '@module': PATHID,
  // '@private': EOL,
  // '@protected': EOL,
  // '@public': EOL
}
