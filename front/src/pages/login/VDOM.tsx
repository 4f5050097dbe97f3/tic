import React from 'react';
import './style.css';

interface Props {
    create: (e: any) => Promise<void>,
    join: (e: any) => Promise<void>,
}


const VDOM: React.FC<Props> = props => {

    const { create, join } = props

    return (
        <div id="login" >
            <input type="radio" name="tab" id="create" hidden defaultChecked={true} />
            <input type="radio" name="tab" id="join" hidden />

            <main>
                <div className="tab">
                    <label htmlFor="create" className="create_tab">Create Room</label>
                    <label htmlFor="join" className="join_tab">Join Room</label>
                </div>
                <div className="form">
                    <form className="create_room">
                        <h2>Create Your Room</h2>
                        <label><input type="text" placeholder="enter your room id" maxLength={8} /></label>
                        <label><input type="text" placeholder="enter the passcode" maxLength={8} /></label>
                        <button onClick={create}>Create</button>
                    </form>
                    <form className="join_room">
                        <h2>Join A Room</h2>
                        <label><input type="text" placeholder="enter the room id" maxLength={8} /></label>
                        <label><input type="text" placeholder="enter the passcode" maxLength={8} /></label>
                        <button onClick={join}>Join</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default VDOM
