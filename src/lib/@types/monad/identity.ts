import fun, {Fun} from "./fun"

// type
export type Id<a> = Fun<a, a>
// state
const id = <a>(): Id<a> => fun<a, a>(a => a)
// map function
export const mapId = <a, b>(_: Fun<a, b>): Fun<Id<a>, Id<b>> =>
	fun(_ =>
		id<b>()
	)

export const unitId = <a>(): Fun<a, Id<a>> => fun<a, Id<a>>(a => id<a>())
export const joinId = <a>(): Fun<Id<Id<a>>, Id<a>> => fun(aa => aa.f(id<a>()))

export const bindId = <a, b>(f: Fun<a, Id<b>>): Fun<Id<a>, Id<b>> =>
	fun(a =>
		mapId<a, Id<b>>(f).then(joinId<b>()).f(a)
	)

export default id
