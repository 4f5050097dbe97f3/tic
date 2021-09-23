import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface pageState {
    initialized: boolean,
    socket: Socket | null
}

type chess = 'O' | 'X' | ''
type Btn = [chess, chess, chess, chess, chess, chess, chess, chess, chess,]

enum serverStatus {
    WAITING_FOR_OTHER_PLAYER_TO_JOIN,
    O_next,
    X_next,
    O_won,
    X_won,
    Draw,
}

enum Status {
    WAITING_FOR_OTHER_PLAYER_TO_JOIN = 'waiting for other player to join',
    YOUR_TURN = 'your turn',
    WAITING_FOR_OTHER_PLAYER = 'waiting for other player',
    YOU_WON = 'you won',
    YOU_LOST = 'you lost',
    Draw = 'draw',
}

interface gameState {
    btn: Btn,
    status: Status
}

function convert(x: serverStatus, mark: string): Status {
    if (x === serverStatus.WAITING_FOR_OTHER_PLAYER_TO_JOIN) return Status.WAITING_FOR_OTHER_PLAYER_TO_JOIN

    if (x === serverStatus.O_next) {
        if (mark === 'O') return Status.YOUR_TURN
        return Status.WAITING_FOR_OTHER_PLAYER
    }
    if (x === serverStatus.X_next) {
        if (mark === 'X') return Status.YOUR_TURN
        return Status.WAITING_FOR_OTHER_PLAYER
    }
    if (x === serverStatus.O_won) {
        if (mark === 'O') return Status.YOU_WON
        return Status.YOU_LOST
    }
    if (x === serverStatus.X_won) {
        if (mark === 'X') return Status.YOU_WON
        return Status.YOU_LOST
    }

    return Status.Draw

}



function useHooks(roomID: string, mark: string) {

    const start: Btn = ['', '', '', '', '', '', '', '', '',]
    const begin = (mark === 'O') ? Status.WAITING_FOR_OTHER_PLAYER_TO_JOIN : Status.WAITING_FOR_OTHER_PLAYER

    const [page, setPage] = useState<pageState>({ initialized: false, socket: null })
    const [game, setGame] = useState<gameState>({ btn: start, status: begin })

    useEffect(() => {
        const socket = io({
            query: { roomID, mark }
        })

        socket.on('connect', () => {
            setPage({ initialized: true, socket })
        })

        socket.on('update', (btn, status: serverStatus) => {

            setGame({ btn, status: convert(status, mark) })
        })
    }, [])

    return { ...page, ...game }

}

export default useHooks
