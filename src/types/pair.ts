import fun, {Fun} from "./fun"

export const id = <a>() => fun<a, a>(a => a)

export interface Pair<a, b> {
	left: a,
	right: b,
	map: <c, d>() => Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>>
	mapLeft: <c>() => Fun<Fun<a, c>, Pair<c, b>>
	mapRight: <c>() => Fun<Fun<b, c>, Pair<a, c>>
	swap: () => Pair<b, a>
}

const functions = <a, b>() => ({
	map<c, d>(this: Pair<a, b>): Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>> { return mapPair<a, b, c, d>().f(this) },
	mapLeft<c>(this: Pair<a, b>): Fun<Fun<a, c>, Pair<c, b>> { return mapLeftPair<a, b, c>().f(this) },
	mapRight<c>(this: Pair<a, b>): Fun<Fun<b, c>, Pair<a, c>> { return mapRightPair<a, b, c>().f(this) },
	swap(this: Pair<a, b>): Pair<b, a> { return swapPair<a, b>().f(this) }
})

export const pair = <a, b>(left: a, right: b): Pair<a, b> => ({ left, right, ...functions<a, b>() })

const mapPair = <a, b, c, d>(): Fun<Pair<a, b>, Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>>> =>
	fun<Pair<a, b>, Fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>>>(p =>
	fun<Fun<a, c>, Fun<Fun<b, d>, Pair<c, d>>>(f =>
	fun<Fun<b, d>, Pair<c, d>>(g =>
		pair<c, d>(f.f(p.left), g.f(p.right))
	)))

const mapLeftPair = <a, b, c>(): Fun<Pair<a, b>, Fun<Fun<a, c>, Pair<c, b>>> =>
	fun<Pair<a, b>, Fun<Fun<a, c>, Pair<c, b>>>(p =>
	fun<Fun<a, c>, Pair<c, b>>(f =>
		mapPair<a, b, c, b>().f(p).f(f).f(id<b>())
	))

const mapRightPair = <a, b, c>(): Fun<Pair<a, b>, Fun<Fun<b, c>, Pair<a, c>>> =>
	fun<Pair<a, b>, Fun<Fun<b, c>, Pair<a, c>>>(p =>
	fun<Fun<b, c>, Pair<a, c>>(f =>
		mapPair<a, b, a, c>().f(p).f(id<a>()).f(f)
	))

const swapPair = <a, b>(): Fun<Pair<a, b>, Pair<b, a>> =>
	fun<Pair<a, b>, Pair<b, a>>(p =>
		pair(p.right, p.left)
	)

const joinPair = () => null!
const joinLeftPair = () => null!
const joinRightPair = () => null!

const bindPair = () => null!
const bindLeftPair = () => null!
const bindPRightair = () => null!

export default pair
