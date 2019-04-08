
// // tslint:disable:variable-name object-literal-shorthand interface-over-type-literal no-consecutive-blank-lines triple-equals

// import * as Immutable from "immutable"

// interface Fun<a, b> {
// 	f: (_: a) => b
// 	then: <c>(g: Fun<b, c>) => Fun<a, c>
// }

// const Fun = <a, b>(f: (_: a) => b): Fun<a, b> =>
// 	({
// 		f: f,
// 		then<c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
// 			return then(this, g)
// 		}
// 	})

// const then = <a, b, c>(f: Fun<a, b>, g: Fun<b, c>): Fun<a, c> =>
// 	Fun<a, c>(a => g.f(f.f(a)))

// const id = <a>(): Fun<a, a> => Fun(x => x)

// const incr: Fun<number, number> = Fun(x => x + 1)
// const double: Fun<number, number> = Fun(x => x * 2)
// const decr: Fun<number, number> = Fun(x => x - 1)
// const is_even: Fun<number, boolean> = Fun(x => x % 2 == 0)
// const str_len: Fun<string, number> = Fun(x => x.length)

// type Countainer<a> = { value: a, counter: number }
// const map_Countainer = <a, b>(f: Fun<a, b>): Fun<Countainer<a>, Countainer<b>> =>
// 	Fun(c => ({ ...c, value: f.f(c.value) }))
// const id_Countainer = <a>(): Fun<Countainer<a>, Countainer<a>> => map_Countainer(id<a>())
// /*
// id_Countainer == id<Countainer<a>>
// map_Countainer(f.then(g)) == map_Countainer(f).then(map_Countainer(g))
// */

// const c_i: Countainer<number> = { value: 10, counter: 0 }
// const c_s: Countainer<string> = { value: "ten", counter: 1 }

// const make_money = <a>(c: Countainer<a>) => ({ ...c, counter: c.counter + 1 })

// const incr_countainer =
// 	map_Countainer(incr)
// const double_countainer =
// 	map_Countainer(double)
// const is_even_countainer =
// 	map_Countainer(is_even)
// const length_countainer =
// 	map_Countainer(str_len)


// /*
// type F<a> = ...
// const map_F = <a,b>(f:Fun<a,b>) : Fun<F<a>, F<b>> =>

// const id_F = <a>() => map_F(id<a>())
// id_F == id<F<a>>
// map_F(f.then(g)) == map_F(f).then(map_F(g))
// */

// type Either<a, b> = { kind: "left", v: a } | { kind: "right", v: b }
// // Either<a,b> = a + b


// // type Option<a> = { kind:"none" } | { kind:"some", value:a }
// // const none = <a>() : Fun<{},Option<a>> => Fun<{},Option<a>>(_ => ({ kind:"none" }))
// // const some = <a>() : Fun<a,Option<a>> => Fun<a,Option<a>>(x => ({ kind:"some", value:x }))

// // const match = <a,c>(f:Fun<a,c>, g:Fun<{},c>) : Fun<Option<a>,c> =>
// //   Fun(x => x.kind == "none" ? g.f({}) : f.f(x.value))

// // const map_Option = <a,b>(f:Fun<a,b>) : Fun<Option<a>, Option<b>> =>
// //   match<a,Option<b>>(f.then(some<b>()), none<b>())

// // // const id_Option = <a>() => map_Option(id<a>())
// // // id_F == id<Option<a>>
// // // map_F(f.then(g)) == map_F(f).then(map_F(g))

// // type SMM<a> = Option<Countainer<a>>
// // const map_SMM = <a,b>(f:Fun<a,b>) : Fun<SMM<a>,SMM<b>> => map_Option(map_Countainer(f))

// // const f:Fun<SMM<string>,SMM<boolean>> = map_SMM(str_len.then(incr).then(is_even))

// type Pair<a, b> = { a: a, b: b }
// const map_Pair = <a1, b1, a2, b2>(f: Fun<a1, a2>, g: Fun<b1, b2>): Fun<Pair<a1, b1>, Pair<a2, b2>> =>
// 	Fun(p => ({ a: f.f(p.a), b: g.f(p.b) }))

// const apply = <a, b>(): Fun<Pair<Fun<a, b>, a>, b> => Fun(p => p.a.f(p.b))

// type Unit = {}
// const Unit: Unit = {}

// const zero_int: Fun<Unit, number> = Fun((_: Unit) => 0)
// const plus_int: Fun<Pair<number, number>, number> = Fun(ab => ab.a + ab.b)

// const verify_identity_int = (x: number) =>
// 	plus_int.f({ a: zero_int.f(Unit), b: x }) == x &&
// 	plus_int.f({ b: zero_int.f(Unit), a: x }) == x

// const verify_assoc_int = (a: number, b: number, c: number) =>
// 	plus_int.f({ a: plus_int.f({ a: a, b: b }), b: c }) ==
// 	plus_int.f({ a, b: plus_int.f({ a: b, b: c }) })

// type Id<a> = a
// const map_Id = <a, b>(f: Fun<a, b>): Fun<Id<a>, Id<b>> => f

// // const unit_Option = <a>() : Fun<Id<a>, Option<a>> => some<a>()
// //   // Fun((x:a) : Option<a> => some<a>().f(x))

// // const join_Option = <a>() : Fun<Option<Option<a>>, Option<a>> =>
// //   Fun(o_o => o_o.kind == "none" ? none<a>().f({}) : o_o.value)

// const unit_Countainer = <a>(): Fun<Id<a>, Countainer<a>> =>
// 	Fun(x => ({ value: x, counter: 0 }))

// const join_Countainer = <a>(): Fun<Countainer<Countainer<a>>, Countainer<a>> =>
// 	Fun(c_c => ({ value: c_c.value.value, counter: c_c.counter + c_c.value.counter }))

// type Fun_n<c, a> = Fun<c, a>

// const unit_Fun_n = <a, c>(): Fun<Id<a>, Fun_n<c, a>> =>
// 	Fun((v: a) => Fun<c, a>(_ => v))

// const map_Fun_n = <c, a, b>(f: Fun<a, b>): Fun<Fun_n<c, a>, Fun_n<c, b>> =>
// 	Fun((g: Fun_n<c, a>) => g.then(f))

// const join_Fun_n = <c, a>(): Fun<Fun_n<c, Fun_n<c, a>>, Fun_n<c, a>> =>
// 	Fun((f: Fun_n<c, Fun_n<c, a>>) => Fun<c, a>(n => f.f(n).f(n)))

// type LP<a> = Pair<a, number>
// const unit_LP = <a>(): Fun<Id<a>, LP<a>> =>
// 	Fun(v => ({ a: v, b: 1 }))

// const map_LP = <a, b>(): Fun<Fun<a, b>, Fun<LP<a>, LP<b>>> =>
// 	Fun(f => Fun(lp_a => ({ a: f.f(lp_a.a), b: lp_a.b })))

// const join_LP = <a>(): Fun<LP<LP<a>>, LP<a>> =>
// 	Fun((x: LP<LP<a>>) => ({ a: x.a.a, b: x.b * x.a.b }))

// interface Option<a> { v: ({ k: "n" } | { k: "s", v: a }), then: <b>(k: (_: a) => Option<b>) => Option<b> }
// const none = <a>(): Option<a> => ({ v: { k: "n" }, then<b>(this: Option<a>, k: (_: a) => Option<b>) { return bind_Option(this, k) } })
// const some = <a>(): Fun<a, Option<a>> => Fun<a, Option<a>>(x => ({ v: { k: "s", v: x }, then<b>(this: Option<a>, k: (_: a) => Option<b>) { return bind_Option(this, k) } }))
// const map_Option = <a, b>(f: Fun<a, b>): Fun<Option<a>, Option<b>> =>
// 	Fun(x => x.v.k == "n" ? none<b>() : f.then(some<b>()).f(x.v.v))

// const unit_Option = <a>() => some<a>()
// const join_Option = <a>(): Fun<Option<Option<a>>, Option<a>> =>
// 	Fun(x => x.v.k == "n" ? none<a>() : x.v.v)

// const bind_Option = <a, b>(p: Option<a>, k: (_: a) => Option<b>): Option<b> => map_Option<a, Option<b>>(Fun(k)).then(join_Option<b>()).f(p)

// // const safe_div = (a:Option<number>, b:Option<number>) : Option<number> =>
// //   a.then(a_v =>
// //   b.then(b_v =>
// //   b_v == 0 ? none<number>() : some<number>().f(a_v / b_v)))

// // const n1 = some<number>().f(10)
// // const n2 = some<number>().f(2)
// // safe_div(n1, safe_div(n2, n1)).then(res =>
// // ...)

// let log = ""
// const add1 = (x: number, y: number): number => {
// 	log = log + `add(${x},${y})`
// 	return x + y
// }

// const add2 = (x: number, y: number): Fun<string, Pair<number, string>> => {
// 	const res = x + y
// 	return Fun((log: string) => ({ a: res, b: log + `add(${x},${y})` }))
// }

// interface Counter { v: number }
// const add3 = (x: number, y: number): Fun<Counter, Pair<number, Counter>> => {
// 	const res = x + y
// 	return Fun(log => ({ a: res, b: { ...log, v: log.v + 1 } }))
// }

// interface St<s, a> { run: Fun<s, Pair<a, s>>, then: <b>(k: (_: a) => St<s, b>) => St<s, b> }
// const run_St = <s, a>(): Fun<St<s, a>, Fun<s, Pair<a, s>>> => Fun(p => p.run)
// const mk_St = <s, a>(run: Fun<s, Pair<a, s>>): St<s, a> => ({ run: run, then<b>(this: St<s, a>, k: (_: a) => St<s, b>): St<s, b> { return bind_St(this, k) } })
// const map_St = <s, a, b>(f: Fun<a, b>): Fun<St<s, a>, St<s, b>> =>
// 	Fun((p: St<s, a>): St<s, b> => mk_St(p.run.then(map_Pair<a, s, b, s>(f, id()))))

// const unit_St = <s, a>(a: a): St<s, a> =>
// 	mk_St(Fun(s => ({ a: a, b: s })))

// const join_St = <s, a>(): Fun<St<s, St<s, a>>, St<s, a>> =>
// 	Fun((p: St<s, St<s, a>>): St<s, a> => mk_St<s, a>(p.run.then(map_Pair(run_St(), id())).then(apply())))

// const bind_St = <s, a, b>(p: St<s, a>, k: (_: a) => St<s, b>): St<s, b> =>
// 	map_St<s, a, St<s, b>>(Fun(k)).then(join_St<s, b>()).f(p)

// const add_st = <s>(p: St<s, number>, q: St<s, number>): St<s, number> =>
// 	p.then(p_v =>
// 		q.then(q_v =>
// 			unit_St(p_v + q_v)))

// interface StFail<s, a> {
// 	run: Fun<s, Option<Pair<a, s>>>,
// 	then: <b>(k: (_: a) => StFail<s, b>) => StFail<s, b>
// }
// const run_StFail = <s, a>(): Fun<StFail<s, a>, Fun<s, Option<Pair<a, s>>>> => Fun(p => p.run)
// const mk_StateFail = <s, a>(run: Fun<s, Option<Pair<a, s>>>): StFail<s, a> =>
// 	({ run: run, then<b>(this: StFail<s, a>, k: (_: a) => StFail<s, b>) { return bind_StFail(this, k) } })

// const unit_StFail = <s, a>(a: a): StFail<s, a> =>
// 	mk_StateFail(Fun(s => unit_Option<Pair<a, s>>().f({ a: a, b: s })))

// const fail_StFail = <s, a>(): StFail<s, a> =>
// 	mk_StateFail(Fun(s => none()))

// const map_StFail = <s, a, b>(f: Fun<a, b>): Fun<StFail<s, a>, StFail<s, b>> =>
// 	Fun((p: StFail<s, a>) => mk_StateFail(p.run.then(map_Option(map_Pair(f, id<s>())))))

// const join_StFail = <s, a>(): Fun<StFail<s, StFail<s, a>>, StFail<s, a>> =>
// 	Fun((p: StFail<s, StFail<s, a>>) =>
// 		mk_StateFail(
// 			p.run.then(
// 				map_Option(
// 					map_Pair(
// 						run_StFail<s, a>(), id<s>()).then(apply())).then(
// 							join_Option()))
// 		)
// 	)

// const bind_StFail = <s, a, b>(p: StFail<s, a>, k: (_: a) => StFail<s, b>): StFail<s, b> =>
// 	map_StFail<s, a, StFail<s, b>>(Fun(k)).then(join_StFail()).f(p)

// const get_st_fail = <s>(): StFail<s, s> =>
// 	mk_StateFail(Fun(s => some<Pair<s, s>>().f({ a: s, b: s })))

// const set_st_fail = <s>(new_s: s): StFail<s, Unit> =>
// 	mk_StateFail(Fun(s => some<Pair<Unit, s>>().f({ a: {}, b: new_s })))

// const together = <s, a, b>(p: StFail<s, a>, q: StFail<s, b>): StFail<s, Pair<a, b>> =>
// 	p.then(p_v =>
// 		q.then(q_v =>
// 			unit_StFail({ a: p_v, b: q_v })))

// const mt_if = <s, a>(c: StFail<s, boolean>, t: StFail<s, a>, e: StFail<s, a>): StFail<s, a> =>
// 	c.then(c_v => c_v ? t : e)

// type Memory = Immutable.Map<string, number>
// type FakeThread<a> = StFail<Memory, a>

// // const get_var = (v: string): FakeThread<number> =>
// // 	get_st_fail<Memory>().then(m =>
// // 		m.has(v) ? unit_StFail(m.get(v))
// // 			: fail_StFail<Memory, number>()
// // 	)

// // const set_var = (v: string, e: number): FakeThread<Unit> =>
// // 	get_st_fail<Memory>().then(m =>
// // 		set_st_fail<Memory>(m.set(v, e)))

// // const swap_a_b: FakeThread<number> =
// // 	together(get_var("a"), get_var("b")).then(({ a: a_v, b: b_v }) =>
// // 		together(set_var("a", b_v), set_var("b", a_v)).then(_ =>
// // 			unit_StFail(a_v + b_v)
// // 		))

// const initial_memory = Immutable.Map<string, number>([["a", 1], ["b", 2]])

// type ThreadResult<s, e, a> =
// 	{ k: "res", v: Pair<s, a> }
// 	| { k: "fail", v: e }
// 	| { k: "brrrr", v: Pair<Thread<s, e, a>, s> }

// interface Thread<s, e, a> {
// 	run: Fun<s, ThreadResult<s, e, a>>,
// }

// const mk_Thread = <s, e, a>(run: Fun<s, ThreadResult<s, e, a>>): Thread<s, e, a> => ({ run: run })

// const map_ThreadResult = <s, e, a, b>(f: Fun<a, b>): Fun<ThreadResult<s, e, a>, ThreadResult<s, e, b>> =>
// 	Fun((r: ThreadResult<s, e, a>): ThreadResult<s, e, b> =>
// 		r.k == "res" ?
// 			({ k: "res", v: map_Pair<s, a, s, b>(id<s>(), f).f(r.v) })
// 			: r.k == "fail" ?
// 				({ k: "fail", v: r.v })
// 				: ({ k: "brrrr", v: map_Pair(map_Thread<s, e, a, b>(f), id<s>()).f(r.v) })
// 	)

// const map_Thread = <s, e, a, b>(f: Fun<a, b>): Fun<Thread<s, e, a>, Thread<s, e, b>> =>
// 	Fun((p: Thread<s, e, a>): Thread<s, e, b> =>
// 		mk_Thread(
// 			p.run.then(map_ThreadResult<s, e, a, b>(f))
// 		))

// const unit = <s, e, a>(a: a): Thread<s, e, a> =>
// 	mk_Thread(Fun((s0: s): ThreadResult<s, e, a> => ({ k: "res", v: { a: s0, b: a } })))
// const fail = <s, e, a>(e: e): Thread<s, e, a> =>
// 	mk_Thread(Fun((s0: s): ThreadResult<s, e, a> => ({ k: "fail", v: e })))
// const freeze = <s, e>(): Thread<s, e, Unit> =>
// 	mk_Thread(Fun((s0: s): ThreadResult<s, e, Unit> => ({ k: "brrrr", v: { a: unit({}), b: s0 } })))

// const join_Thread = <s, e, a>(): Fun<Thread<s, e, Thread<s, e, a>>, Thread<s, e, a>> =>
// 	Fun((pp: Thread<s, e, Thread<s, e, a>>): Thread<s, e, a> =>
// 		mk_Thread(
// 			Fun((s0: s): ThreadResult<s, e, a> => {
// 				const qp: ThreadResult<s, e, Thread<s, e, a>> = pp.run.f(s0)
// 				if (qp.k === "res") {
// 					const p: Thread<s, e, a> = qp.v.b
// 					const s1 = qp.v.a
// 					const q: ThreadResult<s, e, a> = p.run.f(s1)
// 					return q
// 				} else if (qp.k === "fail") {
// 					return { k: "fail", v: qp.v }
// 				} else {
// 					const pp1: Thread<s, e, Thread<s, e, a>> = qp.v.a
// 					const s1 = qp.v.b
// 					const p: Thread<s, e, a> = join_Thread<s, e, a>().f(pp1)
// 					const q: ThreadResult<s, e, a> = p.run.f(s1)
// 					return q
// 				}
// 			}
// 			))
// 	)
