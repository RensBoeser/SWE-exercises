import fun, {Fun} from "../types/fun"
import {Pair} from "../types/pair"
import {List, none} from "../types/list"
import {ListMonoid} from "../types/monoid"
import {Unit} from "../types/unit"

// Define strings in terms of the string monoid, characterized by:

// let zero: <a>() => Fun<unit, List<a>>
// let plus: <a>() => Fun<Pair<List<a>,List<a>>,List<a>>

// where plus is the list concatenation.

// a type T;
// a function plus : Pair<T,T> => T;
// a function zero : Unit => T;
// the identity law: `plus(zero({}), x) = plus(x, zero({})) = x`;
// the associative law: `plus({ fst:a, snd:plus({fst:b, snd:c})}) = plus({ fst:plus({ fst:a, snd:b }), snd:c })`.

export const listMonoid: ListMonoid = ({
	zero: <a>(): Fun<Unit, List<a>> => fun(({}) => none<a>()),
	plus: <a>(): Fun<Pair<List<a>, List<a>>, List<a>> => fun(ls => ls.left.concat(ls.right))
})
