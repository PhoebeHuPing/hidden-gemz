import express from 'express'
import * as Path from 'node:path'

import postRoutes from './routes/posts.ts'
import commentRoutes from './routes/comments.ts'
import favouriteRoutes from './routes/favourites.ts'
import followRoutes from './routes/follows.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/posts', postRoutes)
server.use('/api/v1/comments', commentRoutes)
server.use('/api/v1/favourites', favouriteRoutes)
server.use('/api/v1/follows', followRoutes)

if (process.env.NODE_ENV !== 'production') {
  import('dotenv')
    .then((dotenv) => dotenv.config())
    .catch((err) => {
      console.error('Failed to load dotenv: ', err)
    })
}

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}


export default server
