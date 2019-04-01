// a type T;
// a function plus : Pair<T,T> => T;
// a function zero : Unit => T;
// the identity law: `plus(zero({}), x) = plus(x, zero({})) = x`;
// the associative law: `plus({ fst:a, snd:plus({fst:b, snd:c})}) = plus({ fst:plus({ fst:a, snd:b }), snd:c })`.
