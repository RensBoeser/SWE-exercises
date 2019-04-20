import fun, {Fun} from "../functor/fun"
import id from '../functor/identity'

export type Either<a, b> = ({
	kind: "left"
	value: a
} | {
	kind: "right"
	value: b
}) & {
	then: <c>(f: (b: b) => Either<a, c>) => Either<a, c>
}

export const inl = <a, b>(): Fun<a, Either<a, b>> => fun<a, Either<a, b>>(a => ({
	kind: "left",
	value: a,
	then<c>(this: Either<a, b>, f: (b: b) => Either<a, c>) { return bindEither<a, b, a, c>(id<a>(), fun(f)).f(this) }
}))
export const inr = <a, b>(): Fun<b, Either<a, b>> => fun<b, Either<a, b>>(b => ({
	kind: "right",
	value: b,
	then<c>(this: Either<a, b>, f: (b: b) => Either<a, c>) { return bindEither<a, b, a, c>(id<a>(), fun(f)).f(this) }
}))

// functorial structure: map
export const mapEither = <a, b, c, d>(f: Fun<a, c>, g: Fun<b, d>): Fun<Either<a, b>, Either<c, d>> =>
	fun(e =>
		e.kind === "left"
		? f.then(inl<c, d>()).f(e.value)
		: g.then(inr<c, d>()).f(e.value)
	)

// monoidal structure: join, unit
export const unitEither = <a, b>(): Fun<a, Either<b, a>> => inr<b, a>()
export const unitEitherLeft = <a, b>(): Fun<b, Either<b, a>> => inl<b, a>()

export const joinEither = <a, b>(): Fun<Either<b, Either<b, a>>, Either<b, a>> =>
	fun(e =>
		e.kind === "left" ? inl<b, a>().f(e.value) : e.value
	)

// monadic structure: bind
export const bindEither = <a, b, c, d>(f: Fun<a, c>, g: Fun<b, Either<c, d>>): Fun<Either<a, b>, Either<c, d>> =>
	fun(e =>
		mapEither<a, b, c, Either<c, d>>(f, g).then(joinEither<d, c>()).f(e)
	)
