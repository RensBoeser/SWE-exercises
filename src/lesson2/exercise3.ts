// Consider a tile game where each tile can be either terrain, a town, or an army.
// The player can build a town converting a terrain tile to a town,
// destroy a town or an army reverting a town back to a terrain tile,
// or moving an army changing a terrain tile into an army tile.
// Any other combination keeps the tile as it is.

import fun, { Fun } from "../types/fun"
import {List, some, none} from "../types/list"

// Implement the tile as a Tile Functor whose data structure is Tile<a>, where a defines the kind of tile.

type TileKind = "army" | "terrain" | "town"

interface Tile<a> {
	kind: a
	map: <b>(f: Fun<Tile<a>, Tile<b>>) => Tile<b>
	join: () => Tile<a>
}

const functorFunctions = <a>() => ({
	map<b>(this: Tile<a>, f: Fun<Tile<a>, Tile<b>>): Tile<b> { return mapTile(f).f(this) },
	join(this: Tile<Tile<a>>): Tile<a> { return joinTile<a>().f(this) }
})

const tile = (kind: TileKind): Tile<TileKind> => ({
	kind,
	...functorFunctions<TileKind>()
})

const mapTile = <a, b>(f: Fun<Tile<a>, Tile<b>>): Fun<Tile<a>, Tile<b>> => fun(t => f.f(t))
const joinTile = <a>(): Fun<Tile<Tile<a>>, Tile<a>> => fun(t => t.kind)

const destroyArmy =  tile("army").map(fun(_ => tile("terrain")))
const destroyTown =  tile("town").map(fun(_ => tile("terrain")))
const spawnArmy = tile("terrain").map(fun(_ => tile("army")))
const spawnTown = tile("terrain").map(fun(_ => tile("town")))

// Implement the composite functor List<Tile<a>> that converts all the tiles of type a in a different tile.

const tileList: List<Tile<TileKind>> = some(tile("army"), some(tile("terrain"), some(tile("town"), none())))

const changeTiles = (tileType: TileKind) =>
	tileList.map(fun(t =>
		t.map(fun(_ =>
			tile(tileType)
		))
	))
