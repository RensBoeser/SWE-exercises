import {Option, some, none} from "../monad/option"
import fun, {Fun} from "../monad/fun"

interface ServerConnection {
	ip: string
	hello: string
}

interface ServerContent {
	ip: string
	content: string
}

const connect = (ip: string): Option<ServerConnection> =>
	Math.random() > 0.15
	? some<ServerConnection>().f({ip, hello: "connected"})
	: none<ServerConnection>().f({})

const get = (ip: string): Option<ServerContent> =>
		Math.random() > 0.25
		? some<ServerContent>().f({ip, content: "content"})
		: none<ServerContent>().f({})

const fetch = (ip: string): Option<ServerContent> =>
	connect(ip).then(connection => {
		console.log(connection.hello)
		return get(ip).then(content => {
			console.log(content.content)
			return some<ServerContent>().f(content)
		})
	})
