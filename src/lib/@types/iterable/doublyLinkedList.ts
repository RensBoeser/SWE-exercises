import fun, {Fun} from "../fun"

export type DoublyLinkedList<a> = {
	kind: "none"
} | {
	kind: "some"
	parent: DoublyLinkedList<a>
	tail: DoublyLinkedList<a>
	head: a
}

export const none = <a>(): DoublyLinkedList<a> => ({ kind: "none" })
export const some = <a>(head: a, tail: DoublyLinkedList<a>, parent: DoublyLinkedList<a>): DoublyLinkedList<a> => ({ kind: "some", head, tail, parent })

// functorial structure: map
export const doublyLinkedListMap = <a, b>(): Fun<Fun<a, b>, Fun<DoublyLinkedList<a>, DoublyLinkedList<b>>> =>
	fun(f =>
	fun(l =>
		l.kind === "none"
		? none<b>()
		: some<b>(f.f(l.head), doublyLinkedListMap<a, b>().f(f).f(l.tail), doublyLinkedListMap<a, b>().f(f).f(l.parent))
	))

// monoidal structure: unit, join
export const doublyLinkedListUnit = <a>(): Fun<a, DoublyLinkedList<a>> => fun(a => some(a, none<a>(), none<a>()))
export const doublyLinkedListJoin = <a>(): Fun<DoublyLinkedList<DoublyLinkedList<a>>, DoublyLinkedList<a>> =>
	fun(l =>
		l.kind === "none"
		? none<a>()
		: l.head.kind === "none"
		? none<a>()
		: null! // IDK
	)

// monadic structure: bind
export const doublyLinkedListBind = <a, b>(): Fun<Fun<a, DoublyLinkedList<b>>, Fun<DoublyLinkedList<a>, DoublyLinkedList<b>>> =>
fun(f =>
fun(l =>
	doublyLinkedListMap<a, DoublyLinkedList<b>>().f(f).then(doublyLinkedListJoin()).f(l)
))

// extra functions
// export const doublyLinkedListLast = <a>(): Fun<DoublyLinkedList<a>, DoublyLinkedList<a>> =>
// 	fun(l =>
// 		l.kind === "none"
// 		? none<a>()
// 		: l.tail.kind === "none"
// 		? l
// 		: doublyLinkedListLast<a>().f(l.tail)
// 	)
// export const doublyLinkedListFirst = <a>(): Fun<DoublyLinkedList<a>, DoublyLinkedList<a>> =>
// 	fun(l =>
// 		l.kind === "none"
// 		? none<a>()
// 		: l.parent.kind === "none"
// 		? l
// 		: doublyLinkedListFirst<a>().f(l.parent)
// 	)
