import fun, {Fun} from "./fun"

// type
export type Id<a> = Fun<a, a>
// state
const id = <a>(): Id<a> => fun<a, a>(a => a)
// map function
export const mapId = <a, b>(): Fun<Id<a>, Fun<Fun<a, b>, Id<b>>> =>
	fun<Id<a>, Fun<Fun<a, b>, Id<b>>>(_ =>
	fun<Fun<a, b>, Id<b>>(__ =>
		id<b>()
	))

export default id

/*
type F<a> = ...
const map_F = <a,b>(f:Fun<a,b>) : Fun<F<a>, F<b>> =>

const id_F = <a>() => map_F(id<a>())
id_F == id<F<a>>
map_F(f.then(g)) == map_F(f).then(map_F(g))
*/
