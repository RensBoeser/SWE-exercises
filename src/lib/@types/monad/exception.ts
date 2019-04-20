// Implement an Exception Functor Exception<a> where its data structure is defined with a discriminate union made of Result and Error.
// Result contains an element of type a while Error contains a string reporting an error message.
import fun, {Fun} from "./fun"

type Exception<a> = {
	kind: "result"
	value: a
} | {
	kind: "error"
	error: string
}

const error = <a>(): Fun<string, Exception<a>> =>
	fun<string, Exception<a>>(error =>
		({kind: "error", error})
	)
const result = <a>(): Fun<a, Exception<a>> =>
	fun<a, Exception<a>>(value =>
		({kind: "result", value})
	)

const mapException = <a, b>(): Fun<Fun<a, b>, Fun<Exception<a>, Exception<b>>> =>
	fun(f =>
	fun(e =>
		e.kind === "error"
		? error<b>().f(e.error)
		: result<b>().f(f.f(e.value))
	))

const joinException = <a>(): Fun<Exception<Exception<a>>, Exception<a>> =>
	fun(e =>
		e.kind === "error"
		? error<a>().f(e.error)
		: e.value
	)

const bindException = <a, b>(): Fun<Exception<a>, Fun<Fun<a, Exception<b>>, Exception<b>>> =>
	fun(e =>
	fun(f =>
		mapException<a, Exception<b>>().f(f).then(joinException<b>()).f(e)
	))
