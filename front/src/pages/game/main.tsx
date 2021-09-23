import react from 'react';
import useHooks from './useHooks';
import VDOM from './VDOM';

interface Props {
    roomID: string,
    mark: 'O' | 'X' | ''
}

function Main(props: Props) {

    const { roomID, mark } = props
    const { initialized, btn, status, socket } = useHooks(roomID, mark)

    if (initialized === false || socket === null) return null

    const handleClick = (index: number) => {
        if (status === 'your turn' && btn[index] === '') {
            socket.emit('one_step', index, mark)
        }
    }


    return <VDOM btn={btn} status={status} handleClick={handleClick} />
}



export default Main
