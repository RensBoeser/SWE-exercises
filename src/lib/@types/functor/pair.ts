import fun, {Fun} from "./fun"
import id, {Id} from "./identity"

export type Pair<a, b> = {
	left: a
	right: b
	map: <c, d>() => Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>>
	mapLeft: <c>() => Fun<Fun<a, c>, Pair<c, b>>
	mapRight: <c>() => Fun<Fun<b, c>, Pair<a, c>>
	swap: () => Pair<b, a>
}

const functions = <a, b>() => ({
	map<c, d>(this: Pair<a, b>): Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>> { return mapPair<a, b, c, d>().f(this) },
	mapLeft<c>(this: Pair<a, b>): Fun<Fun<a, c>, Pair<c, b>> { return mapPairLeft<a, b, c>().f(this) },
	mapRight<c>(this: Pair<a, b>): Fun<Fun<b, c>, Pair<a, c>> { return mapPairRight<a, b, c>().f(this) },
	swap(this: Pair<a, b>): Pair<b, a> { return swapPair<a, b>().f(this) }
})

const pair = <a, b>(): Fun<a, Fun<b, Pair<a, b>>> =>
	fun(left =>
	fun(right =>
		({ left, right, ...functions<a, b>() })
	))

const mapPair = <a, b, c, d>(): Fun<Pair<a, b>, Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>>> =>
	fun(p =>
	fun(f =>
	fun(g =>
		pair<c, d>().f(f.f(p.left)).f(g.f(p.right))
	)))

const mapPairLeft = <a, b, c>(): Fun<Pair<a, b>, Fun<Fun<a, c>, Pair<c, b>>> =>
	fun(p =>
	fun(f =>
		mapPair<a, b, c, b>().f(p).f(f).f(id<b>())
	))

const mapPairRight = <a, b, c>(): Fun<Pair<a, b>, Fun<Fun<b, c>, Pair<a, c>>> =>
	fun(p =>
	fun(f =>
		mapPair<a, b, a, c>().f(p).f(id<a>()).f(f)
	))

const swapPair = <a, b>(): Fun<Pair<a, b>, Pair<b, a>> =>
	fun(p =>
		pair<b, a>().f(p.right).f(p.left)
	)

export default pair
