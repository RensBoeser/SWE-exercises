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
	join: () => List<a>
	encode: (shift: number) => List<string>
	concat: (l: List<a>) => List<a>
}

const functions = <a>() => ({
	map<b>(this: List<a>, f: Fun<a, b>): List<b> { return fun<List<a>, List<b>>(l => mapList(l, f)).f(this) },
	join(this: List<List<a>>): List<a> { return joinList(this) },
	encode(this: List<string>, shift: number): List<string> { return encode().f(shift).f(this) },
	concat(this: List<a>, l: List<a>): List<a> { return joinList(some(this, some(l, none()))) }
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

const joinList = <a>(l: List<List<a>>): List<a> => l.kind === "Empty"
	? none()
	: l.head.kind === "Empty"
	? joinList(l.tail)
	// : concatList(l.head, joinList(l.tail))
	: joinList(some(l.head, some(joinList(l.tail), none())))

// const concatList = <a>(l1: List<a>, l2: List<a>): List<a> => joinList(some(l1, some(l2, none())))

const encode = (): Fun<number, Fun<List<string>, List<string>>> => {
	return fun(shift =>
		fun(list =>
			mapList(list, fun(x => (x.charCodeAt(0) + shift).toString()))
		)
	)
}
