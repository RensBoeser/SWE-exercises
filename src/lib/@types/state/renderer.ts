import fun, {Fun} from "../fun"
import state, {State, unitState} from "./state"
import unit, {Unit} from "../unit"
import pair, {Pair} from "../pair/pair"

type RenderingBuffer = string
type Renderer = State<RenderingBuffer, Unit>

const renderNothing = (): Renderer => unitState<RenderingBuffer, Unit>().f(fun(b => pair(unit, b)))
const renderString = (s: string): Renderer => unitState<RenderingBuffer, Unit>().f(fun(b => pair(unit, b + s)))

const renderAsterisk = (): Renderer => renderString("*")
const renderSpace = (): Renderer => renderString(" ")
const renderNewline = (): Renderer => renderString("\n")

const repeat = <s, a>(n: number, f: (_: a) => State<s, a>) =>
	(a: a): State<s, Unit> =>
	n === 0 ? unitState<s, Unit>().f(fun(s => pair<Unit, s>(unit, s)))
	: f(a).then(a => repeat(n - 1, f)(a))

const renderLine = (n: number): Renderer =>
	repeat<RenderingBuffer, Unit>(n, _ => renderAsterisk())({})

const renderSquare = (size: number): Renderer =>
	repeat<RenderingBuffer, Unit>(size, _ =>
		renderLine(size).then(__ => renderNewline()))(unit)

console.log(renderSquare(10).run.f("").right)
