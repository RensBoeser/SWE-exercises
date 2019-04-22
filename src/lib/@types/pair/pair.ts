import fun, {Fun} from "../fun"
import id, {Id} from "../identity"

export type Pair<a, b> = {
	left: a
	right: b
	map: <c, d>(f: Fun<a, c>, g: Fun<b, d>) => Pair<c, d>
	mapLeft: <c>(f: Fun<a, c>) => Pair<c, b>
	mapRight: <c>(f: Fun<b, c>) => Pair<a, c>
	swap: () => Pair<b, a>
}

const functions = <a, b>() => ({
	map<c, d>(this: Pair<a, b>, f: Fun<a, c>, g: Fun<b, d>): Pair<c, d> { return mapPair<a, b, c, d>(f, g).f(this) },
	mapLeft<c>(this: Pair<a, b>, f: Fun<a, c>): Pair<c, b> { return mapPairLeft<a, b, c>(f).f(this) },
	mapRight<c>(this: Pair<a, b>, f: Fun<b, c>): Pair<a, c> { return mapPairRight<a, b, c>(f).f(this) },
	swap(this: Pair<a, b>): Pair<b, a> { return swapPair<a, b>().f(this) }
})

const pair = <a, b>(left: a, right: b): Pair<a, b> => ({ left, right, ...functions<a, b>() })

const mapPair = <a, b, c, d>(f: Fun<a, c>, g: Fun<b, d>): Fun<Pair<a, b>, Pair<c, d>> =>
	fun(p =>
		pair<c, d>(f.f(p.left), g.f(p.right))
	)

const mapPairLeft = <a, b, c>(f: Fun<a, c>): Fun<Pair<a, b>, Pair<c, b>> =>
	fun(p =>
		mapPair<a, b, c, b>(f, id<b>()).f(p)
	)

const mapPairRight = <a, b, c>(f: Fun<b, c>): Fun<Pair<a, b>, Pair<a, c>> =>
	fun(p =>
		mapPair<a, b, a, c>(id<a>(), f).f(p)
	)

const swapPair = <a, b>(): Fun<Pair<a, b>, Pair<b, a>> =>
	fun(p =>
		pair<b, a>(p.right, p.left)
	)

export default pair
