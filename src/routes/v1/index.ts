import handler from './handler.js'
import type { FastifyPluginCallback } from 'fastify'

const index: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get('/', _, handler)

  done()
}

export default index
