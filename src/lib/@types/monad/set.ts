import fun, {Fun} from "./fun"

// functorial structure: map
export const setMap = <a, b>(): Fun<Fun<a, b>, Fun<Set<a>, Set<b>>> =>
fun(f =>
	fun(s => {
		const newData = new Set<b>()
		s.forEach(value => newData.add(f.f(value)))
		return newData
	}))

// monoidal structure: join, unit
export const setUnit = <a>(): Fun<a, Set<a>> => fun(a => new Set<a>([a]))

export const setJoin = <a>(): Fun<Set<Set<a>>, Set<a>> =>
	fun(s => {
		const newData = new Set<a>()
		s.forEach(v1 => v1.forEach(v2 => newData.add(v2)))
		return newData
	})

// monadic structure: bind
export const setBind = <a, b>(): Fun<Fun<a, Set<b>>, Fun<Set<a>, Set<b>>> =>
	fun(f =>
	fun(s =>
		setMap<a, Set<b>>().f(f).then(setJoin()).f(s)
	))
