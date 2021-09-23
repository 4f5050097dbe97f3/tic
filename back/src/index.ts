import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import handleConnect from './api/game/socket';

const PORT = 3002

const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: ['http://localhost:3000', 'http://192.168.0.100:3000'] }
})

io.on('connection', handleConnect)

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

