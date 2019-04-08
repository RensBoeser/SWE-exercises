import {Fun} from "./fun"

type Option<a> = ({
	kind: "some"
	value: a
} | {
	kind: "none"
}) & {
	map: <b>(this: Option<a>, f: Fun<a, b>) => Option<b>
	join: (this: Option<Option<a>>) => Option<a>
	flatmap: <b>(this: Option<Option<a>>, f: Fun<a, b>) => Option<b>
}

const functions = <a>() => ({
	map<b>(this: Option<a>, f: Fun<a, b>): Option<b> { return mapOption(this, f) },
	join(this: Option<Option<a>>): Option<a> { return joinOption(this) },
	flatmap<b>(this: Option<Option<a>>, f: Fun<a, b>): Option<b> { return flatmapOption(this, f) }
})

const none = <a>(): Option<a> => ({ kind: "none", ...functions<a>() })
const some = <a>(value: a): Option<a> => ({ kind: "some", value, ...functions<a>() })

const mapOption = <a, b>(o: Option<a>, f: Fun<a, b>): Option<b> =>
	o.kind === "none"
	? none<b>()
	: some(f.apply(o.value))

const joinOption = <a>(o: Option<Option<a>>): Option<a> =>
	o.kind === "none" ? none<a>() : o.value

const flatmapOption = <a, b>(o: Option<Option<a>>, f: Fun<a, b>): Option<b> =>  mapOption<a, b>(joinOption(o), f)
