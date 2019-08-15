# dumb-doc

Dumb and verbose documentation generator

-= WIP =-

# DocblockTagParser

## @const | @var | @global

Signatures

```
@const {types} name
@const {types} name =[value]
@const {types} name description
@const {types} name =[value] description
```

Returns

```
{ types, name [ , value [ , description ] ] }
```

## @function | @class | @interface | @method

Signatures

```
@function name
@function name description
```

Returns

```
{ name [ , description ] }
```

## @param | @property

Signatures

```
@param {types} name
@param {types} params.name
@param {types} name                description
@param {types} params.name         description
@param {types} [name=value]        description
@param {types} [params.name=value] description
```

Returns

```
{ types, name [ , value [ , description ] ] }
```

## @return | @throws

Signatures

```
@return {types}
@return {types} description
```

Returns

```
{ types, [ , description ] }
```

## @constructor | @abstract | @private | @protected | @public | @ignore

Signatures

```
@constructor
@abstract
@private
@protected
@public
```

Returns

```
{ }
```

## @author | @license | @copyright | @example | @deprecated

Signatures

```
@author     description
@license    description
@copyright  description
@example    description
@deprecated description
```

Returns

```
{ description }
```

## @module | @exports

Signatures

```
@module pathid
```

Returns

```
{ pathid }
```

## @callback | @extends

Signatures

```
@callback name
@callback pathid/name
```

Returns

```
{ pathid [, module], name }
```
