import fun, {Fun} from "../functor/fun"
import pair, {Pair} from "../functor/pair"
import {some, none, List, concatList} from "../monad/list"
import absoluteUnit, {Unit} from "../object/unit"

const zero = <a>(): Fun<Unit, List<a>> => fun(_ => none<a>().f(absoluteUnit))
const plus = <a>(): Fun<Pair<List<a>, List<a>>, List<a>> => fun<Pair<List<a>, List<a>>, List<a>>(p => concatList<a>().f(p.left).f(p.right))
const unit = <a>(): Fun<a, List<a>> => fun(a => some<a>().f(a).f(none<a>().f(absoluteUnit)))
const join = <a>(): Fun<List<List<a>>, List<a>> => fun(l =>
	l.kind === "none"
	? none<a>().f(absoluteUnit)
	: l.head.kind === "none"
	? join<a>().f(l.tail)
	: plus<a>().f(pair<List<a>, List<a>>().f(l.head).f(join<a>().f(l.tail)))
)
