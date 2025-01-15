export const sendRequestsInLoop = async (target: string, count: number) =>
	Promise.all(
		Array.from({ length: count }, () =>
			fetch(target)
				.then(r => ({ status: r.status }))
				.catch(e => ({ error: e.message })),
		),
	)

export const isReachable = async (target: string) => {
	try {
		return (await fetch(target, { method: 'HEAD' })).ok
	} catch {
		return false
	}
}
