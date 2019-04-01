import fun, {Fun} from "./fun"

export type List<a> = ({
	kind: "Cons"
	head: a
	tail: List<a>
} | {
	kind: "Empty"
})
& {
	map: <b>(f: Fun<a, b>) => List<b>
	join: (l: List<a>) => List<a>
	encode: (shift: number) => List<string>
}

const functions = <a>() => ({
	map<b>(this: List<a>, f: Fun<a, b>): List<b> { return mapList(this, f) },
	join(this: List<a>, l: List<a>): List<a> { return joinList(this, l) },
	encode(this: List<string>, shift: number): List<string> { return encode().f(shift).f(this) }
})

export const some = <a>(head: a, tail: List<a>): List<a> => ({
	kind: "Cons",
	head,
	tail,
	...functions<a>()
})

export const none = <a>(): List<a> => ({
	kind: "Empty",
	...functions<a>()
})

const mapList = <a, b>(l: List<a>, f: Fun<a, b>): List<b> =>
	l.kind === "Empty" ? none<b>() : some(f.f(l.head), mapList(l.tail, f))

const joinList = <a>(l1: List<a>, l2: List<a>): List<a> => l1.kind === "Empty"
	? (l2.kind === "Empty"
		? none()
		: some(l2.head, joinList(l1, l2.tail)))
	: some(l1.head, joinList(l1.tail, l2))

const encode = (): Fun<number, Fun<List<string>, List<string>>> => {
	return fun(shift =>
		fun(list =>
			mapList(list, fun(x => (x.charCodeAt(0) + shift).toString()))
		)
	)
}
