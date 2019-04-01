import fun, {Fun} from "../types/fun"

const incr = fun((x: number) => x + 1)
const double = fun((x: number) => x * 2)
const square = fun((x: number) => x * x)
const isPositive = fun((x: number) => x > 0)
const isEven = fun((x: number) => x % 2 === 0)
const invert = fun((x: number) => -x)
const squareRoot = fun((x: number) => Math.sqrt(x))
const ifThenElse = <a, b>(p: Fun<a, boolean>, _then: Fun<a, b>, _else: Fun<a, b>): Fun<a, b> => {
		return fun((x: a) => {
			if (p.f(x)) {
				return _then.f(x)
			} else {
				return _else.f(x)
			}
		})
	}

// implement the following functions in terms of function composition

// 1) Increment a number and then check if it is positive
const a = incr.then(isPositive)
// 2) Increment a number, double it and check if it is positive
const b = incr.then(double.then(isPositive))
// 3) Implement a function that computes the square root if the input is positive, otherwise inverts it and then performs the square root
const c = ifThenElse(isPositive, squareRoot, invert.then(squareRoot))
// 4) Square a number and then if it is even invert it otherwise do the square root
const d = square.then(ifThenElse(isEven, invert, squareRoot))
