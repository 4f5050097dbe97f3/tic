import React from 'react';
import './style.css';

type chess = 'O' | 'X' | ''
type Btn = [chess, chess, chess, chess, chess, chess, chess, chess, chess,]

enum Status {
    WAITING_FOR_OTHER_PLAYER_TO_JOIN = 'waiting for other player to join',
    YOUR_TURN = 'your turn',
    WAITING_FOR_OTHER_PLAYER = 'waiting for other player',
    YOU_WON = 'you won',
    YOU_LOST = 'you lost',
    Draw = 'draw',
    Error = 'error',
}

interface Props {
    btn: Btn,
    status: Status,
    handleClick: (index: number) => void
}

const VDOM: React.FC<Props> = (props) => {

    const { btn, status, handleClick } = props

    return (
        <>
            <div className="tic">
                {
                    btn.map((item, index) => {
                        return <button key={index} onClick={e => handleClick(index)}>{item}</button>
                    })
                }
            </div>
            <p className="status">{status}</p>
        </>
    )
}

export default VDOM
