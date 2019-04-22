import fun, {Fun} from "../fun"
import unit, {Unit} from "../unit"
import pair, {Pair} from "../pair/pair"

export type State<s, a> = {
	run: Fun<s, Pair<a, s>>
	then: <b>(f: (_: a) => State<s, b>) => State<s, b>
}

export const state = <s, a>(f: Fun<s, Pair<a, s>>) => ({
	run: f,
	then<b>(this: State<s, a>, f: (a: a) => State<s, b>): State<s, b> { return bindState<s, a, b>(fun(f)).f(this) }
})

export const mapState = <s, a, b>(f: Fun<a, b>): Fun<State<s, a>, State<s, b>> =>
	fun(s0 => s0.then(a => state<s, b>(fun(s1 => pair<b, s>(f.f(a), s1)))))

export const unitState = <s, a>(): Fun<Fun<s, Pair<a, s>>, State<s, a>> =>
	fun(f => state<s, a>(f))

export const joinState = <s, a>(): Fun<State<s, State<s, a>>, State<s, a>> =>
	fun<State<s, State<s, a>>, State<s, a>>(ss =>
		ss.run.then(fun(p => p.left)).f(unit)
	)

export const bindState = <s, a, b>(f: Fun<a, State<s, b>>): Fun<State<s, a>, State<s, b>> =>
	fun(s => mapState<s, a, State<s, b>>(f).then(joinState<s, b>()).f(s))

export const getState = <s>(): Fun<s, State<s, s>> => fun<s, State<s, s>>(s0 => state<s, s>(fun(s1 => pair<s, s>(s0, s1))))
export const setState = <s>(s: s): State<s, Unit> => state<s, Unit>(fun(_ => pair<Unit, s>(unit, s)))

export default state

// export const mapState = <s, a, b>(f: Fun<a, b>): Fun<State<s, a>, State<s, b>> =>
// 	fun(s => s.then(fun(p => p.map<b, s>(f, id<s>()))))

// export const unitState = <s, a>(): Fun<a, State<s, a>> =>
// 	fun<a, State<s, a>>(a => fun(s => pair<a, s>(a, s)))

// export const joinState = <s, a>(): Fun<State<s, State<s, a>>, State<s, a>> =>
// 	fun<State<s, State<s, a>>, State<s, a>>(ss =>
// 		fun<s, Pair<a, s>>(s =>
// 			pair<a, s>(ss.then(fun(p => p.left.f(p.right))).f(s).left, s)
// 		)
// 	)

// export const bindState = <s, a, b>(f: Fun<a, State<s, b>>): Fun<State<s, a>, State<s, b>> =>
// 	fun(s =>
// 		mapState<s, a, State<s, b>>(f).then(joinState<s, b>()).f(s)
// 	)

// export const getState = <s>(): State<s, s> => fun<s, Pair<s, s>>(s => pair<s, s>(s, s))
// export const setState = <s>(s: s): State<s, Unit> => fun<s, Pair<Unit, s>>(_ => pair<Unit, s>(unit, s))
