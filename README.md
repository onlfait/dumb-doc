# dumb-doc

Dumb and verbose documentation generator

-= WIP =-

# DocblockTagParser

## @const | @var | @global

```
@const {types} name
@const {types} name =[value]
@const {types} name description
@const {types} name =[value] description
```

## @function | @class | @interface | @method

```
@function name
@function name description
```

## @param | @property

```
@param {types} name
@param {types} params.name
@param {types} name description
@param {types} params.name description
@param {types} [name=value] description
@param {types} [params.name=value] description
```

## @return | @throws

```
@return {types}
@return {types} description
```

## @constructor | @abstract | @private | @protected | @public | @ignore

```
@constructor
@abstract
@private
@protected
@public
```

## @author | @license | @copyright | @example | @deprecated

```
@author description
@license description
@copyright description
@example description
@deprecated description
```

## @module

```
@module path
```
