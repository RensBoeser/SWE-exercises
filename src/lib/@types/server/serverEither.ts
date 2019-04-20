import {Exception, unitException, unitExceptionNone} from "../monad/exceptionEither"
import fun, {Fun} from "../monad/fun"

interface ServerConnection {
	ip: string
	hello: string
}

interface ServerContent {
	ip: string
	content: string
}

const connect = (ip: string): Exception<ServerConnection> =>
	Math.random() > 0.15
	? unitException<ServerConnection>().f({ip, hello: "connected"})
	: unitExceptionNone<ServerConnection>().f("failed connection")

const get = (ip: string): Exception<ServerContent> =>
		Math.random() > 0.25
		? unitException<ServerContent>().f({ip, content: "content"})
		: unitExceptionNone<ServerContent>().f("failed to get content")

const fetch = (ip: string): Exception<ServerContent> =>
	connect(ip).then(connection => {
		console.log(connection.hello)
		return get(ip).then(content => {
			console.log(content.content)
			return unitException<ServerContent>().f(content)
		})
	})
