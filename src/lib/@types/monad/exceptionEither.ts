import {Fun} from "./fun"
import {Either, mapEither, joinEither, unitEither, bindEither, unitEitherLeft} from "./either"
import id from "./identity"

export type Exception<a> = Either<string, a>

export const mapException = <a, b>(f: Fun<a, b>): Fun<Exception<a>, Exception<b>> => mapEither<string, a, string, b>(id<string>(), f)
export const joinException = <a>(): Fun<Exception<Exception<a>>, Exception<a>> => joinEither<a, string>()
export const unitException = <a>(): Fun<a, Exception<a>> => unitEither<a, string>()
export const unitExceptionNone = <a>(): Fun<string, Exception<a>> => unitEitherLeft<a, string>()
export const bindException = <a, b>(f: Fun<a, Exception<b>>): Fun<Exception<a>, Exception<b>> => bindEither<string, a, string, b>(id<string>(), f)
