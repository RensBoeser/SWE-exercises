import {Fun} from "./fun"
import {Either, mapEither, joinEither, unitEither, unitEitherLeft, bindEither} from "./either"
import {Unit} from "../object/unit"
import id from "./identity"

export type Option<a> = Either<Unit, a>

export const mapOption = <a, b>(f: Fun<a, b>): Fun<Option<a>, Option<b>> => mapEither<Unit, a, Unit, b>(id<Unit>(), f)
export const joinOption = <a>(): Fun<Option<Option<a>>, Option<a>> => joinEither<a, Unit>()
export const unitOption = <a>(): Fun<a, Option<a>> => unitEither<a, Unit>()
export const unitOptionNone = <a>(): Fun<Unit, Option<a>> => unitEitherLeft<a, Unit>()
export const bindOption = <a, b>(f: Fun<a, Option<b>>): Fun<Option<a>, Option<b>> => bindEither<Unit, a, Unit, b>(id<Unit>(), f)
