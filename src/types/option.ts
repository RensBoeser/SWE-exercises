import fun, {Fun} from "./fun"

export type Option<a> = ({
	kind: "some",
	value: a
} | {
	kind: "none"
}) & {
	map: <b>(this: Option<a>) => Fun<Fun<a, b>, Option<b>>
	join: (this: Option<Option<a>>) => Option<a>
	bind: <b>(this: Option<a>) => Fun<Fun<a, Option<b>>, Option<b>>
}

const functions = <a>() => ({
	map<b>(this: Option<a>): Fun<Fun<a, b>, Option<b>> { return mapOption<a, b>().f(this) },
	join(this: Option<Option<a>>): Option<a> { return joinOption<a>().f(this) },
	bind<b>(this: Option<a>): Fun<Fun<a, Option<b>>, Option<b>> { return bindOption<a, b>().f(this) }
})

export const some = <a>(value: a): Option<a> => ({
	kind: "some",
	value,
	...functions<a>()
})

export const none = <a>(): Option<a> => ({
	kind: "none",
	...functions<a>()
})

export const mapOption  = <a, b>(): Fun<Option<a>, Fun<Fun<a, b>, Option<b>>> =>
	fun(o =>
	fun(f =>
		o.kind === "none" ? none<b>() : some(f.f(o.value))
	))

export const joinOption = <a>(): Fun<Option<Option<a>>, Option<a>> =>
	fun(o =>
		o.kind === "none" ? none<a>() : o.value
	)

export const bindOption = <a, b>(): Fun<Option<a>, Fun<Fun<a, Option<b>>, Option<b>>> =>
	fun(o =>
	fun(f =>
		joinOption<b>().f(mapOption<a, Option<b>>().f(o).f(f))
	))
