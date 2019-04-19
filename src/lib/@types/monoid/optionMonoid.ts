import fun, {Fun} from "../functor/fun"
import {some, none, Option, joinOption} from "../monad/option"
import absoluteUnit from "../object/unit"

const unit = <a>(): Fun<a, Option<a>> => fun(thing => some<a>().f(thing))
const join = <a>(): Fun<Option<Option<a>>, Option<a>> => fun(x => x.kind === "none" ? none<a>().f(absoluteUnit) : x.value)
