import {Fun} from "./fun"

type List<a> = ({
	kind: "some"
	head: a
	tail: List<a>
} | {
	kind: "none"
}) & {
	map: <b>(this: List<a>, f: Fun<a, b>) => List<b>
	join: (this: List<List<a>>) => List<a>
	flatmap: <b>(this: List<List<a>>, f: Fun<a, b>) => List<b>
}

const functions = <a>() => ({
	map<b>(this: List<a>, f: Fun<a, b>): List<b> { return listMap(this, f) },
	join(this: List<List<a>>): List<a> { return listJoin(this) },
	flatmap<b>(this: List<List<a>>, f: Fun<a, b>): List<b> { return listFlatmap(this, f) }
})

const none = <a>(): List<a> => ({ kind: "none", ...functions<a>() })
const some = <a>(head: a, tail: List<a>): List<a> => ({ kind: "some", head, tail, ...functions<a>() })

const listMap = <a, b>(l: List<a>, f: Fun<a, b>): List<b> =>
	l.kind === "none"
	? none<b>()
	: some(f.apply(l.head), listMap(l.tail, f))

const listJoin = <a>(l: List<List<a>>): List<a> =>
	l.kind === "none"
	? none<a>()
	: l.head.kind === "none"
	? listJoin(l.tail)
	: listJoin(some(some(l.head.head, l.head.tail), l.tail))

const listFlatmap = <a, b>(l: List<List<a>>, f: Fun<a, b>): List<b> => listMap(listJoin(l), f)
