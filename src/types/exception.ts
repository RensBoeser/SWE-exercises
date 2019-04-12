// Implement an Exception Functor Exception<a> where its data structure is defined with a discriminate union made of Result and Error.
// Result contains an element of type a while Error contains a string reporting an error message.
import fun, {Fun} from "./fun"

type Exception<a> = ({
	kind: "result",
	value: a
} | {
	kind: "error",
	error: string
}) & {
	map: <b>() => Fun<Fun<a, b>, Exception<b>>
}

const functions = <a>() => ({
	map<b>(this: Exception<a>): Fun<Fun<a, b>, Exception<b>> { return mapException<a, b>().f(this) }
})

const result = <a>(value: a): Exception<a> => ({ kind: "result", value, ...functions<a>() })
const error = <a>(error: string): Exception<a> => ({ kind: "error", error, ...functions<a>() })

const mapException = <a, b>(): Fun<Exception<a>, Fun<Fun<a, b>, Exception<b>>> =>
	fun(e =>
	fun(f =>
		e.kind === "error" ? error(e.error) : result(f.f(e.value))
	))
