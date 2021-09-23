import rooms from '../database/data';
import { Btn, Chess, Status } from '../database/types';
import { Socket, Server } from 'socket.io';

function handleConnect(this: Server, socket: Socket) {
    const io = this

    const roomID = socket.handshake.query.roomID as string
    const mark = socket.handshake.query.mark as string

    const [room] = rooms.filter(item => { if (item.roomID === roomID) return true })



    socket.join(roomID)

    if (mark === 'X') {
        room.status = Status.O_next
        io.in(roomID).emit('update', room.btn, room.status)
    }

    socket.on('one_step', (index: number, mark: 'O' | 'X') => {
        room.btn[index] = mark

        const result = judge(room.btn)


        if (result === 'O') room.status = Status.O_won
        if (result === 'X') room.status = Status.X_won
        if (result === 'Draw') room.status = Status.Draw

        if (result === 'Unsettled') {
            if (mark === 'O') room.status = Status.X_next
            if (mark === 'X') room.status = Status.O_next
        }

        io.in(roomID).emit('update', room.btn, room.status)

    })

    socket.on('disconnect', () => {
        room.headcount -= 1


        if (room.headcount === 1) {
            if (room.status === Status.O_next || room.status === Status.X_next) {
                if (mark === 'O') io.in(roomID).emit('update', room.btn, Status.X_won)
                if (mark === 'X') io.in(roomID).emit('update', room.btn, Status.O_won)
            }

            rooms.some((item, index) => {
                if (item === room) {
                    rooms.splice(index, 1)
                    return true
                }
            })
        }

    })

}

function judge(btn: Btn): Chess | 'Draw' | 'Unsettled' {
    const [a, b, c,
        d, e, f,
        g, h, i] = btn

    if (a + b + c === 'OOO' || a + b + c === 'XXX') return a
    if (d + e + f === 'OOO' || d + e + f === 'XXX') return d
    if (g + h + i === 'OOO' || g + h + i === 'XXX') return g

    if (a + d + g === 'OOO' || a + d + g === 'XXX') return a
    if (b + e + h === 'OOO' || b + e + h === 'XXX') return b
    if (c + f + i === 'OOO' || c + f + i === 'XXX') return c

    if (a + e + i === 'OOO' || a + e + i === 'XXX') return a
    if (c + e + g === 'OOO' || c + e + g === 'XXX') return c

    function drew(item: Chess): Boolean {
        if (item !== '') return true
        return false
    }

    if (btn.every(drew)) return 'Draw'

    return 'Unsettled'
}




export default handleConnect


