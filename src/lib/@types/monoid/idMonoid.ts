import fun, {Fun} from "../functor/fun"
import identity, {Id} from "../functor/identity"

const id = <a>(): Fun<a, Id<a>> => fun(_ => identity<a>())
const join = <a>(): Fun<Id<Id<a>>, Id<a>> => fun(_ => identity<a>())
