import fun, {Fun} from "../functor/fun"
import unit, {Unit} from "../object/unit"

export type List<a> = {
	kind: "some"
	head: a
	tail: List<a>
} | {
	kind: "none"
}

export const some = <a>(): Fun<a, Fun<List<a>, List<a>>> =>
	fun<a, Fun<List<a>, List<a>>>(head =>
	fun<List<a>, List<a>>(tail =>
		({ kind: "some", head, tail })
	))
export const none = <a>(): Fun<Unit, List<a>> =>
	fun(_ =>
		({ kind: "none" })
	)

export const mapList = <a, b>(): Fun<Fun<a, b>, Fun<List<a>, List<b>>> =>
	fun<Fun<a, b>, Fun<List<a>, List<b>>>(f =>
	fun<List<a>, List<b>>(l =>
		l.kind === "none"
		? none<b>().f(unit)
		: some<b>().f(f.f(l.head)).f(mapList<a, b>().f(f).f(l.tail))
	))

export const joinList = <a>(): Fun<List<List<a>>, List<a>> =>
	fun<List<List<a>>, List<a>>(l =>
		l.kind === "none"
		? none<a>().f(unit)
		: l.head.kind === "none"
		? joinList<a>().f(l.tail)
		: joinList<a>().f(
			some<List<a>>().f(some<a>().f(l.head.head).f(none<a>().f(unit))).f(some<List<a>>().f(l.head.tail).f(l.tail)))
	)

export const bindList = <a, b>(): Fun<List<a>, Fun<Fun<a, List<b>>, List<b>>> =>
	fun(l =>
	fun(f =>
		mapList<a, List<b>>().f(f).then(joinList<b>()).f(l)
	))

export const concatList = <a>(): Fun<List<a>, Fun<List<a>, List<a>>> =>
	fun<List<a>, Fun<List<a>, List<a>>>(l1 =>
	fun<List<a>, List<a>>(l2 =>
		joinList<a>().f(some<List<a>>().f(l1).f(some<List<a>>().f(l2).f(none<List<a>>().f(unit))))
	))
