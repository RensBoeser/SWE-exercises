import fun from "../types/fun"
import {StringMonoid} from "../types/monoid"

// Define strings in terms of the string monoid, characterized by:

// const zero: Fun<unit, string>
// const plus: Fun<Pair<string, string>, string>

// a type T;
// a function plus : Pair<T,T> => T;
// a function zero : Unit => T;
// the identity law: `plus(zero({}), x) = plus(x, zero({})) = x`;
// the associative law: `plus({ fst:a, snd:plus({fst:b, snd:c})}) = plus({ fst:plus({ fst:a, snd:b }), snd:c })`.

export const stringMonoid: StringMonoid = {
	zero: fun(({}) => ""),
	plus: fun(p => p.left + p.right)
}
