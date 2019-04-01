// Implement an Exception Functor Exception<a> where its data structure is defined with a discriminate union made of Result and Error.
// Result contains an element of type a while Error contains a string reporting an error message.

import fun, {Fun} from "../types/fun"

type Exception<a> = ({
	kind: "result"
	value: a
} | {
	kind: "error",
	error: string
})
& {
	map: <b>(f: Fun<a, b>) => Exception<b>
	join: () => Exception<a>
}

const functorFunctions = <a>() => ({
	map<b>(this: Exception<a>, f: Fun<a, b>): Exception<b> { return mapException<a, b>(f).f(this) },
	join(this: Exception<Exception<a>>): Exception<a> { return joinException<a>().f(this) }
})

const result = <a>(value: a): Exception<a> => ({
	kind: "result",
	value,
	...functorFunctions<a>()
})

const error = <a>(error: string): Exception<a> => ({
	kind: "error",
	error,
	...functorFunctions<a>()
})

const mapException = <a, b>(f: Fun<a, b>): Fun<Exception<a>, Exception<b>> =>
	fun(e => e.kind === "error" ? error<b>(e.error) : result<b>(f.f(e.value)))

const joinException = <a>(): Fun<Exception<Exception<a>>, Exception<a>> =>
	fun(e =>
		e.kind === "result"
		? (e.value.kind === "error"
			? error(e.value.error)
			: result(e.value.value))
		: error(e.error))
