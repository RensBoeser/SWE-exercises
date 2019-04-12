import fun, {Fun} from "./fun"

type List<a> = ({
	kind: "some"
	head: a
	tail: List<a>
} | {
	kind: "none"
}) & {
	map: <b>(this: List<a>) => Fun<Fun<a, b>, List<b>>
	join: (this: List<List<a>>) => List<a>
	flatmap: <b>(this: List<a>) => Fun<Fun<a, List<b>>, List<b>>
	concat: (this: List<a>) => Fun<List<a>, List<a>>
}

const functions = <a>() => ({
	map<b>(this: List<a>): Fun<Fun<a, b>, List<b>> { return listMap<a, b>().f(this) },
	join(this: List<List<a>>): List<a> { return listJoin<a>().f(this) },
	flatmap<b>(this: List<a>): Fun<Fun<a, List<b>>, List<b>> { return listFlatmap<a, b>().f(this) },
	concat(this: List<a>): Fun<List<a>, List<a>> { return listConcat<a>().f(this) }
})

const none = <a>(): List<a> => ({ kind: "none", ...functions<a>() })
const some = <a>(head: a, tail: List<a>): List<a> => ({ kind: "some", head, tail, ...functions<a>() })

const listMap = <a, b>(): Fun<List<a>, Fun<Fun<a, b>, List<b>>> =>
	fun(l =>
		fun(f =>
			l.kind === "none"
			? none<b>()
			: some(f.f(l.head), listMap<a, b>().f(l.tail).f(f))
		)
	)

const listJoin = <a>(): Fun<List<List<a>>, List<a>> =>
	fun(l =>
		l.kind === "none"
		? none<a>()
		: l.head.kind === "none"
		? listJoin<a>().f(l.tail)
		: listJoin<a>().f(some(some(l.head.head, l.head.tail), l.tail))
	)

const listFlatmap = <a, b>(): Fun<List<a>, Fun<Fun<a, List<b>>, List<b>>> =>
	fun(l =>
		fun(f =>
			l.map<List<b>>().then(listJoin()).f(f)
		)
	)

const listConcat = <a>(): Fun<List<a>, Fun<List<a>, List<a>>> =>
	fun<List<a>, Fun<List<a>, List<a>>>(l1 =>
		fun<List<a>, List<a>>(l2 =>
			listJoin<a>().f(some(l1, some(l2, none<List<a>>())))
		)
	)
