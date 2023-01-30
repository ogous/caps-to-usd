export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'test' | 'development' | 'production'
      PORT?: string
      REDIS_HOST: string
      REDIS_PORT: string
      REDIS_PASSWORD: string
    }
  }
}
