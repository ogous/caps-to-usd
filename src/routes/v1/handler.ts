import type { RouteHandler } from 'fastify'
import fetch from 'node-fetch'
const handler: RouteHandler = async (req, res) => {
  const baseUrl = 'https://api.coingecko.com/api/v3/simple/price?ids='
  const url = baseUrl + 'coin-capsule&vs_currencies=usd'
  interface CAPS {
    'coin-capsule': { usd: number }
  }

  const response = await res.server.redis.get('usd')
  if (!response) {
    const result = await fetch(url)
    if (result.ok) {
      const gecko = (await result.json()) as CAPS
      const { usd } = gecko['coin-capsule']
      await req.server.redis.setex('usd', 5 * 1000 * 60, usd)
      return res.send({ usd, from: 'Api' })
    }
    return res.expectationFailed('Can not read from api')
  } else {
    return res.send({ usd: Number(response), from: 'Cache' })
  }
}

export default handler
