import fp from 'fastify-plugin'
import fastifyRedis from '@fastify/redis'

export default fp(
  async (fastify) =>
    await fastify.register(fastifyRedis, {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    })
)
