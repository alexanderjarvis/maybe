# Maybe [![Build Status](https://travis-ci.org/alexanderjarvis/maybe.svg?branch=master)](https://travis-ci.org/alexanderjarvis/maybe) [![npm version](https://badge.fury.io/js/maybes.svg)](https://badge.fury.io/js/maybes)

Maybe is a type that wraps optional values. It can either be a `Just` (has some value) or a `Nothing`
(has no value).

It's defined like this: `type Maybe<A> = Just<A> | Nothing`

In JavaScript, it is a better way of handling `null` and `undefined`. Instead of writing an if
statement, ternary expression, or `&&` shorthand to check if a value is present you can just `map`
over it instead and assign the result of this expression or return it. You can also chain operations
together, often leading to much cleaner code.

It's inspired by Haskell's [Maybe](https://wiki.haskell.org/Maybe), Swift's [Optional](https://developer.apple.com/reference/swift/optional) and
Scala's [Option](http://www.scala-lang.org/api/current/scala/Option.html).

## Installation

Using yarn

```
$ yarn add maybes
```

or npm

```
$ npm install maybes
```

## Usage

Import the library:

```js
import { maybe } from 'maybes'
```

or if you want everything:

```js
import { maybe, just, nothing } from 'maybes'
```

Use the `maybe` function to create a `Maybe` from a value.

```js
const value = maybe(1) // Just(1)

value.isJust() // true
value.isNothing() // false
```

Use `map` to transform the value inside the `Maybe`.

```js
value.map(v => v + 1) // Just(2)
```

Force unwrap the value with `just()` if it is present. Warning: this will throw an Error if it
is a `Nothing` (has no value).

```js
value.just() // 1 (or throws Error)
```

Use the `maybe` function to wrap a possibly empty value.

```js
const empty = maybe(null)

empty.isJust() // false
empty.isNothing() // true

empty.map(v => v + 1) // noop (No Operation)
empty.just() // throws error
```

Use `orJust()` to provide a default value.

```js
empty.map(v => v.toUpperCase()).orJust('hello') // 'hello'
```

Chain operations together using `map`:

```js
const m = maybe('Maybe  ')
const result = m
  .map(v => v.trim())
  .map(v => v.toUpperCase()) // Just('MAYBE')
```

Use `flatMap` if you need to return a `Maybe` in your closure instead of the value. For example,
when you want to explicitly return `Nothing` in a particular case.

```js
const a = maybe('hi')
const result = a.flatMap(v => {
  if (v === 'hi') {
    return just('world')
  } else {
    return nothing
  }
})
```

`just` is a function like `maybe` that takes a value. `nothing` is a reference to `Nothing`.

However using `filter` is usually the best way to return a `Nothing` given a predicate. It returns
`Just` only if there is a value and applying the predicate function to the `Maybe`'s value returns
true.

```js
const name = maybe('  ')
const upper = name
  .map(v => v.trim())
  .filter(v => v.length != 0)
  .map(v => v.toUpperCase())
```

## Types

This library uses [Flowtype](https://flowtype.org) so you can also import the `Maybe` type and use
it's definition:

```js
import { maybe } from 'maybes'
import type { Maybe } from 'maybes'

function getSomething(): Maybe<string> {
  return maybe('something')
}
```

Don't worry if you don't use Flowtype though as it gets stripped by Babel.

## Comparison with vanilla JavaScript

#### Ternary function that optionally calls another function called `transform`.

Without Maybe

```js
(value) ? transform(value) : null
```

(Safe version in case value is falsy, e.g. `0`)
```js
(value != null) ? transform(value) : null
```

With Maybe (handles falsy values like `0` and `''` automatically).

```js
maybe(value).map(transform)
```

#### && and || shorthand

Without Maybe
```js
const object: ?Object = {
  value?: 'hello'
}

object && object.value && object.value.toUpperCase() || ''
```

With Maybe
```js
maybe(object).flatMap(o => maybe(o.value).map(v => v.toUpperCase())).orJust('')
```

With types already converted to `Maybe`'s.
```js
const object = maybe({
  value: maybe('hello')
})

object.flatMap(o => o.value.map(v => v.toUpperCase())).orJust('')
```

## License

Maybe is available under the MIT license. See [LICENCE](./LICENSE).
