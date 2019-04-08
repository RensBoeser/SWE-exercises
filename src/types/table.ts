import Omit from "./object/omit"

// table
export interface Table<a, b> {
	data: Array<a>
	result: Array<b>
	select: <k extends keyof a>(...keys: Array<k>) => Table<Omit<a, k>, Pick<a, k>>
}

const table = <a, b>(): Table<a, b> => {

}
