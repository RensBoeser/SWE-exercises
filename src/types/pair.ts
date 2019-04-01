// Define a pair as a bi-functor `Pair<a, b>`. A bifunctor contains a function

// let map_Pair_left = function<a, b, c>(f: (_: a) => c): Fun<Pair<a,b>, Pair<c, b>>
// let map_Pair_right = function<a, b, c>(f: (_: b) => c): Fun<Pair<a,b>, Pair<a, c>>
// let map2_Pair = function<a, b, c, d>(f: (_: a) => c, g:(_: b) => d):
//   Fun<Pair<a, b>, Pair<c, d>>
// Is it possible to define both the left and right variants from map2_Pair?

import fun, {Fun} from "../types/fun"

const id = <a>(a: a) => a

export interface Pair<a, b> {
	left: a,
	right: b,
	map: <c, d>(f: (_: a) => c, g: (_: b) => d) => Pair<c, d>
	mapLeft: <c>(f: (_: a) => c) => Pair<c, b>
	mapRight: <c>(f: (_: b) => c) => Pair<a, c>
	// join: () => Pair<a, b>
}

const pair = <a, b>(left: a, right: b): Pair<a, b> => ({
	left,
	right,
	map<c, d>(this: Pair<a, b>, f: (_: a) => c, g: (_: b) => d): Pair<c, d> { return mapPair(f, g).f(this) },
	mapLeft<c>(this: Pair<a, b>, f: (_: a) => c): Pair<c, b> { return mapPair<a, b, c, b>(f, id).f(this) },
	mapRight<c>(this: Pair<a, b>, f: (_: b) => c): Pair<a, c> { return mapPair<a, b, a, c>(id, f).f(this) }
	// join(this: Pair<a, b>): Pair<a, b> { return joinPair(f, g) }
})

const mapPair = <a, b, c, d>(f: (_: a) => c, g: (_: b) => d): Fun<Pair<a, b>, Pair<c, d>> => {
	return fun(p => pair<c, d>(f(p.left), g(p.right)))
}

// const joinLeft  = <a, b, c, d>(): Fun<Pair<Pair<a, b>, c>, Pair<d, b>> => null!
// const joinRight = <a, b, c, d>(): Fun<Pair<a, Pair<b, c>>, Pair<a, d>> => null!

export default pair
