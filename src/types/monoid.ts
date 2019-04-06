import {Fun} from "./fun"
import {Pair} from "./pair"
import {Unit} from "./unit"
import {List} from "./list"

export type Monoid<a> = {
	zero: Fun<Unit, a>
	plus: Fun<Pair<a, a>, a>
}

export type StringMonoid = Monoid<string>

export interface ListMonoid {
	zero: <a>() => Fun<Unit, List<a>>
	plus: <a>() => Fun<Pair<List<a>, List<a>>, List<a>>
}
