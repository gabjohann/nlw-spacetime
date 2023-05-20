import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { memoriesRoutes } from './routes/memories'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

//  origin: [todas as urls que poderão acessar o back]
app.register(cors, {
  origin: true, // todas as URLs de front-end poderão acessar nosso backend
})

app.register(jwt, {
  secret: 'XP2ohDeHKB5UqyaynYjR986asgv3ngi6DaPP7JY5KoRL87nB',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '::',
  })
  .then(() => {
    console.log('🚀 HTTP server is running on http://localhost:3333')
  })
