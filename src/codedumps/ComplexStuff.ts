interface Person {
	name: string,
	lastName: string,
	age: number,
	gender: "M" | "F"
}

type PersonProperties = keyof Person
type AnonymusGenderPersonProperties = Exclude<PersonProperties, "gender">
type AnonymusPerson = {
	[K in AnonymusGenderPersonProperties]: Person[K]
}

type ChangePropertyType<T, Property extends keyof T, U> = {
	[K in keyof T]: K extends Property ? U : T[K]
}

type GenderFluid = ChangePropertyType<Person, "gender", number>

let person =
	(
		name: string,
		lastName: string, age: number,
		gender: "M" | "F"): Person => ({
			name,
			lastName,
			age,
			gender
		})

type SelectableEntity<T> = T & {
	select: <K extends keyof T>(this: T, property: K) => T[K]
}

type SelectablePerson = SelectableEntity<Person>

let selectablePerson = (person: Person): SelectablePerson => ({
	...person,
	select<K extends keyof Person>(this: Person, property: K): Person[K] {
		return this[property]
	}
})

let p = person("John", "Doe", 34, "M")
let sp = selectablePerson(p)
let age = sp.select("gender")
