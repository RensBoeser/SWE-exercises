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
}

const functions = <a>() => ({
	map<b>(this: List<a>): Fun<Fun<a, b>, List<b>> { return listMap<a, b>().apply(this) },
	join(this: List<List<a>>): List<a> { return listJoin<a>().apply(this) },
	flatmap<b>(this: List<a>): Fun<Fun<a, List<b>>, List<b>> { return listFlatmap<a, b>().apply(this) }
})

const none = <a>(): List<a> => ({ kind: "none", ...functions<a>() })
const some = <a>(head: a, tail: List<a>): List<a> => ({ kind: "some", head, tail, ...functions<a>() })

const listMap = <a, b>(): Fun<List<a>, Fun<Fun<a, b>, List<b>>> =>
	fun(l =>
		fun(f =>
			l.kind === "none"
			? none<b>()
			: some(f.apply(l.head), listMap<a, b>().apply(l.tail).apply(f))
		)
	)

const listJoin = <a>(): Fun<List<List<a>>, List<a>> =>
	fun(l =>
		l.kind === "none"
		? none<a>()
		: l.head.kind === "none"
		? listJoin<a>().apply(l.tail)
		: listJoin<a>().apply(some(some(l.head.head, l.head.tail), l.tail))
	)

const listFlatmap = <a, b>(): Fun<List<a>, Fun<Fun<a, List<b>>, List<b>>> =>
	fun(l =>
		fun(f =>
			l.map<List<b>>().then(listJoin()).apply(f)
		)
	)
