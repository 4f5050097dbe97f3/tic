import express, { Router, Request, Response } from 'express';
import rooms, { start, Status } from '../database/data';

const router: Router = express.Router()

enum createResponse {
    ROOM_ALREADY_EXISTS = 'this room already exists',
    SUCCEED = 'succeed'
}


router.post('/create', (req: Request, res: Response) => {
    const { roomID, passcode } = req.body

    for (const room of rooms) {
        if (room.roomID === roomID) {
            res.send(createResponse.ROOM_ALREADY_EXISTS)
            return null
        }
    }

    rooms.push({ roomID, passcode, headcount: 1, btn: [...start], status: Status.WAITING_FOR_OTHER_PLAYER_TO_JOIN })
    res.send(createResponse.SUCCEED)

})

enum joinResponse {
    ROOM_IS_FULL = 'this room is full',
    WRONG_PASSCODE = 'wrong passcode',
    ROOM_NOT_EXISTS = 'this room does not exist',
    SUCCEED = 'succeed',
}

router.post('/join', (req: Request, res: Response) => {
    const { roomID, passcode } = req.body

    for (const room of rooms) {
        if (room.roomID === roomID) {
            if (room.headcount === 2) {
                res.send(joinResponse.ROOM_IS_FULL)
                return null
            }

            if (room.passcode === passcode) {
                room.headcount += 1
                room.status = Status.O_next
                res.send(joinResponse.SUCCEED)
                return null
            }
            res.send(joinResponse.WRONG_PASSCODE)
            return null
        }
    }

    res.send(joinResponse.ROOM_NOT_EXISTS)

})


export default router
