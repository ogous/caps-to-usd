import fp from 'fastify-plugin'
import ratelimit from '@fastify/rate-limit'

export default fp(
  async (fastify) =>
    await fastify.register(ratelimit, {
      max: 10,
      timeWindow: '1 minute',
      redis: fastify.redis
    })
)
