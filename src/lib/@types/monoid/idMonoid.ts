import fun, {Fun} from "../fun"
import identity, {Id} from "../identity"

const id = <a>(): Fun<a, Id<a>> => fun(_ => identity<a>())
const join = <a>(): Fun<Id<Id<a>>, Id<a>> => fun(_ => identity<a>())
