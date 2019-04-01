import fun, {Fun} from "../types/fun"
import pair, {Pair} from "../types/pair"

// Define strings in terms of the string monoid, characterized by:

// const zero: Fun<unit, string>
// const plus: Fun<Pair<string, string>, string>

// a type T;
// a function plus : Pair<T,T> => T;
// a function zero : Unit => T;
// the identity law: `plus(zero({}), x) = plus(x, zero({})) = x`;
// the associative law: `plus({ fst:a, snd:plus({fst:b, snd:c})}) = plus({ fst:plus({ fst:a, snd:b }), snd:c })`.

type Unit = {}

type Monoid<a> = {
	zero: Fun<Unit, a>
	plus: Fun<Pair<a, a>, a>
}

type StringMonoid = Monoid<string>

const stringMonoid: StringMonoid = {
	zero: fun(({}) => ""),
	plus: fun(p => p.left + p.right)
}
