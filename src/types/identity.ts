import fun, {Fun} from "./fun"
import {Unit} from "./unit"

export type Identity<a> = Fun<a, a>

// const idIdentity = <a>(): Fun<a, Identity<a>> => fun<a, Identity<a>>(a => fun(_ => a))
// const joinIdentity = <a>(): Fun<Identity<Identity<a>>, Identity<a>> => fun<Identity<Identity<a>>, Identity<a>>(functions => functions.)
