/**
 * @flow
 */

export type Maybe<A> = Just<A> | Nothing
  
type AnyVal = number | boolean | string | Object

class Just<A> {

  value: A

  constructor(value: $NonMaybeType<A>) {
    this.value = value
  }

  filter(p: (A) => boolean): Maybe<A> {
    if (p(this.value)) {
      return this
    } else {
      return nothing
    }
  }

  flatMap<B: AnyVal>(f: (A) => Maybe<B>): Maybe<B> {
    return f(this.value)
  }

  map<B: AnyVal>(f: (A) => B): Maybe<B> {
    return new Just(f(this.value))
  }

  isJust(): boolean {
    return true
  }

  isNothing(): boolean {
    return false
  }

  just(): A {
    return this.value
  }

  orJust<B>(value: B): A {
    return this.value
  }

}

class Nothing {

  filter<A>(p: (_: A) => boolean): Nothing {
    return this
  }

  flatMap<A, B: AnyVal>(f: (_: A) => Maybe<B>): Nothing {
    return this
  }

  map<A, B: AnyVal>(f: (_: A) => B): Nothing {
    return this
  }

  isJust(): boolean {
    return false
  }

  isNothing(): boolean {
    return true
  }

  just() {
    throw Error('Cannot call just() on a Nothing')
  }

  orJust<B>(value: B): B {
    return value
  }

}

function isNil<T>(value: ?T): boolean {
  return value == null
}

export function just<T>(value: AnyVal): Maybe<T> {
  if (isNil(value)) {
    throw Error('Cannot create Just with an empty value: use flowtype!')
  }
  return new Just(value)
}

export const nothing: Nothing = Object.freeze(new Nothing())

export function maybe<T>(value: ?T): Maybe<T> {
  return isNil(value) ? nothing : new Just(value)
}
