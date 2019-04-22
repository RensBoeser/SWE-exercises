import fun, {Fun} from "../fun"
import pair, {Pair} from "../pair/pair"
import unit, {Unit} from "../unit"

const zero: Fun<Unit, string> = fun(_ => "")
const plus: Fun<Pair<string, string>, string> = fun(p => p.left + p.right)
