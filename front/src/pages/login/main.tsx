import React from 'react';
import axios from 'axios';
import VDOM from './VDOM';

interface Status {
    isLoggedIn: boolean,
    roomID: string,
    mark: 'O' | 'X' | '',
}

function Main(props: { sign: React.Dispatch<React.SetStateAction<Status>> }) {

    const setStatus = props.sign

    const create = async (e: any) => {
        e.preventDefault()

        const roomID = e.target.parentNode.children[1].children[0].value
        const passcode = e.target.parentNode.children[2].children[0].value

        if (roomID === '') {
            e.target.parentNode.children[1].style.setProperty('--after', "'" + 'Room ID is empty' + "'")
            return
        }
        if (passcode === '') {
            e.target.parentNode.children[1].style.setProperty('--after', "'" + 'Passcode is empty' + "'")
            return
        }

        const { data } = await axios.post('/api/login/create', { roomID, passcode })

        if (data === 'succeed') {
            setStatus({ isLoggedIn: true, mark: 'O', roomID })
            return
        }

        e.target.parentNode.children[1].style.setProperty('--after', "'" + data + "'")

    }

    const join = async (e: any) => {
        e.preventDefault()

        const roomID = e.target.parentNode.children[1].children[0].value
        const passcode = e.target.parentNode.children[2].children[0].value

        if (roomID === '') {
            e.target.parentNode.children[1].style.setProperty('--after', "'" + 'Room ID is empty' + "'")
            return
        }
        if (passcode === '') {
            e.target.parentNode.children[1].style.setProperty('--after', "'" + 'Passcode is empty' + "'")
            return
        }

        const { data } = await axios.post('/api/login/join', { roomID, passcode })

        if (data === 'succeed') {
            setStatus({ isLoggedIn: true, mark: 'X', roomID })
            return
        }

        e.target.parentNode.children[1].style.setProperty('--after', "'" + data + "'")

    }


    return <VDOM create={create} join={join} />
}



export default Main
