/**
 * @flow
 */

import { maybe, just, nothing } from './maybe'
import type { Maybe } from './maybe'

test('valid values', () => {
  const x: Maybe<*> = maybe(1)
  expect(x.isJust()).toBe(true)
  expect(x.isNothing()).toBe(false)
  const y = maybe(0)
  expect(y.isJust()).toBe(true)
  expect(y.isNothing()).toBe(false)
  const z = maybe({})
  expect(z.isJust()).toBe(true)
  expect(z.isNothing()).toBe(false)
})

test('empty values', () => {
  const x = maybe(null)
  expect(x.isNothing()).toBe(true)
  expect(x.isJust()).toBe(false)
  const y = maybe(undefined)
  expect(y.isNothing()).toBe(true)
  expect(y.isJust()).toBe(false)
})

test('extract value with just()', () => {
  const m = maybe('some value')
  expect(m.just()).toBe('some value')
})

test('just() should throw on an empty value', () => {
  const n = maybe(null)
  expect(n.just).toThrow()
})

test('orJust', () => {
  const x = maybe(null)
  const orValue = x.orJust('hi')
  expect(orValue).toBe('hi')
  const y = maybe('hello')
  expect(y.orJust()).toBe('hello')
})

test('map value', () => {
  const x = maybe('bob')
  const result = x.map(v => v.toUpperCase())
  expect(result).toEqual(maybe('BOB'))
  const value = result.just()
  expect(value).toBe('BOB')
})

test('map empty value is noop', () => {
  const n = maybe(null)
  const result = n.map(v => v.toUpperCase())
  expect(result).toEqual(nothing)
})

test('chaining', () => {
  const a = maybe('Maybe  ')
  const b = a
    .map(v => v.trim())
    .map(v => v.toUpperCase())
    .just()
  expect(b).toBe('MAYBE')
})

test('flatMap', () => {
  const a = maybe('hi')
  const result = a.flatMap(v => {
    if (v === 'hi') {
      return just('world')
    } else {
      return nothing
    }
  })
  expect(result).toEqual(just('world'))
})

test('just() throws on empty values', () => {
  // $FlowIgnore
  const fNull = () => just(null)
  expect(fNull).toThrow()
  // $FlowIgnore
  const fUndefined = () => just(undefined)
  expect(fUndefined).toThrow()
})
