import fun, {Fun} from "../functor/fun"
import pair, {Pair} from "../functor/pair"
import id from "../functor/identity"
import unit, {Unit} from "../object/unit"

export type State<s, a> = Fun<s, Pair<a, s>>

export const mapState = <s, a, b>(f: Fun<a, b>): Fun<State<s, a>, State<s, b>> =>
	fun(s => s.then(fun(p => p.map<b, s>().f(f).f(id<s>()))))

export const unitState = <s, a>(): Fun<a, State<s, a>> =>
	fun<a, State<s, a>>(a => fun(s => pair<a, s>().f(a).f(s)))

export const joinState = <s, a>(): Fun<State<s, State<s, a>>, State<s, a>> =>
	fun<State<s, State<s, a>>, State<s, a>>(ss =>
		fun<s, Pair<a, s>>(s =>
			pair<a, s>().f(ss.then(fun(p => p.left.f(p.right))).f(s).left).f(s)
		)
	)

export const bindState = <s, a, b>(f: Fun<a, State<s, b>>): Fun<State<s, a>, State<s, b>> =>
	fun(s =>
		mapState<s, a, State<s, b>>(f).then(joinState<s, b>()).f(s)
	)

export const getState = <s>(): State<s, s> => fun<s, Pair<s, s>>(s => pair<s, s>().f(s).f(s))
export const setState = <s>(s: s): State<s, Unit> => fun<s, Pair<Unit, s>>(_ => pair<Unit, s>().f(unit).f(s))
