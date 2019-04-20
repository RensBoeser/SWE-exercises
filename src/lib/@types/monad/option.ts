import fun, {Fun} from "../functor/fun"
import unit, {Unit} from "../object/unit"

export type Option<a> = ({
	kind: "some",
	value: a
} | {
	kind: "none"
}) & {
	map: <b>() => Fun<Fun<a, b>, Option<b>>
	join: () => Option<a>
	bind: <b>() => Fun<Fun<a, Option<b>>, Option<b>>
	then: <b>(f: (a: a) => Option<b>) => Option<b>
}

const functions = <a>() => ({
	map<b>(this: Option<a>): Fun<Fun<a, b>, Option<b>> { return mapOption<a, b>().f(this) },
	join(this: Option<Option<a>>): Option<a> { return joinOption<a>().f(this) },
	bind<b>(this: Option<a>): Fun<Fun<a, Option<b>>, Option<b>> { return bindOption<a, b>().f(this) },
	then<b>(this: Option<a>, f: (a: a) => Option<b>): Option<b> { return this.bind<b>().f(fun(f)) }
})

export const some = <a>(): Fun<a, Option<a>> =>
	fun<a, Option<a>>(value => ({
			kind: "some",
			value,
			...functions<a>()
		})
	)

export const none = <a>(): Fun<Unit, Option<a>> =>
fun<Unit, Option<a>>(_ => ({
		kind: "none",
		...functions<a>()
	})
)

export const mapOption  = <a, b>(): Fun<Option<a>, Fun<Fun<a, b>, Option<b>>> =>
	fun(o =>
	fun(f =>
		o.kind === "none" ? none<b>().f(unit) : some<b>().f(f.f(o.value))
	))

export const joinOption = <a>(): Fun<Option<Option<a>>, Option<a>> =>
	fun(o =>
		o.kind === "none" ? none<a>().f(unit) : o.value
	)

export const bindOption = <a, b>(): Fun<Option<a>, Fun<Fun<a, Option<b>>, Option<b>>> =>
	fun(o =>
	fun(f =>
		joinOption<b>().f(mapOption<a, Option<b>>().f(o).f(f))
	))
