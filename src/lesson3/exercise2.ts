import fun, {Fun} from "../types/fun"
import pair, {Pair} from "../types/pair"
import {List, some, none} from "../types/list"

// Define strings in terms of the string monoid, characterized by:

// let zero: <a>() => Fun<unit, List<a>>
// let plus: <a>() => Fun<Pair<List<a>,List<a>>,List<a>>

// where plus is the list concatenation.

// a type T;
// a function plus : Pair<T,T> => T;
// a function zero : Unit => T;
// the identity law: `plus(zero({}), x) = plus(x, zero({})) = x`;
// the associative law: `plus({ fst:a, snd:plus({fst:b, snd:c})}) = plus({ fst:plus({ fst:a, snd:b }), snd:c })`.

type Unit = {}

interface ListMonoid {
	zero: <a>() => Fun<Unit, List<a>>
	plus: <a>() => Fun<Pair<List<a>, List<a>>, List<a>>
}

const listMonoid: ListMonoid = ({
	zero: <a>(): Fun<Unit, List<a>> => fun(({}) => none<a>()),
	plus: <a>(): Fun<Pair<List<a>, List<a>>, List<a>> => null!
})
