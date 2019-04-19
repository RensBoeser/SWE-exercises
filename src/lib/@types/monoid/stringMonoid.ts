import fun, {Fun} from "../functor/fun"
import pair, {Pair} from "../functor/pair"
import unit, {Unit} from "../object/unit"

const zero: Fun<Unit, string> = fun(_ => "")
const plus: Fun<Pair<string, string>, string> = fun(p => p.left + p.right)
