export interface Fun<a, b> {
	f: (_: a) => b
	then: <c>(g: Fun<b, c>) => Fun<a, c>
}

export const fun = <a, b>(f: (_: a) => b): Fun<a, b> => ({
	f,
	then<c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
		return then<a, b, c>(this, g)
	}
})

const then = <a, b, c>(f: Fun<a, b>, g: Fun<b, c>): Fun<a, c> => {
	return fun<a, c>(a => g.f(f.f(a)))
}

export default fun
