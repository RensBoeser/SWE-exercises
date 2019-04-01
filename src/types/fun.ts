export interface Fun<a, b> {
	f: (i: a) => b
	then: <c>(g: Fun<b, c>) => Fun<a, c>
	repeat: () => Fun<number, Fun<a, a>>
	repeatUntil: () => Fun<Fun<a, boolean>, Fun<a, a>>
}

const fun = <a, b>(f: (_: a) => b): Fun<a, b> => ({
	f,
	then<c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> { return then(this, g) },
	repeat(this: Fun<a, a>): Fun<number, Fun<a, a>> {
		return fun(n => repeat(this, n))
	},
	repeatUntil(this: Fun<a, a>): Fun<Fun<a, boolean>, Fun<a, a>> {
		return fun(predicate => repeatUntil(this, predicate))
	}
})

const then = <a, b, c>(f: Fun<a, b>, g: Fun<b, c>): Fun<a, c> => {
	return fun<a, c>(a => g.f(f.f(a)))
}

const repeat = <a>(f: Fun<a, a>, n: number): Fun<a, a> => {
	if (n <= 0) {
		return f
	} else {
		return repeat(f.then(f), n - 1)
	}
}

const repeatUntil = <a>(f: Fun<a, a>, predicate: Fun<a, boolean>): Fun<a, a> => {
	const g =
		(x: a): a => {
			console.log(x, predicate.f(x))
			if (predicate.f(x)) {
				return g(f.f(x))
			} else {
				return x
			}
		}
	return fun(x => g(x))
}

export default fun
