import fun, {Fun} from "../monad/fun"
import identity, {Id} from "../monad/identity"

const id = <a>(): Fun<a, Id<a>> => fun(_ => identity<a>())
const join = <a>(): Fun<Id<Id<a>>, Id<a>> => fun(_ => identity<a>())
