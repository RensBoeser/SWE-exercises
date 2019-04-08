type Omit<T, Condition extends keyof T> = Pick<T, {
	[K in keyof T]: K extends Condition ? never : K
}[keyof T]>

export default Omit
