import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

import Login from './pages/login/main';
import Game from './pages/game/main';

interface Status {
    isLoggedIn: boolean,
    roomID: string,
    mark: 'O' | 'X' | '',
}


function App() {

    const [status, setStatus] = React.useState<Status>({ isLoggedIn: false, roomID: '', mark: '' })

    if (status.isLoggedIn === false) {

        return (
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login sign={setStatus} />
                    </Route>
                    <Route path="*">
                        <Redirect to="/login"></Redirect>
                    </Route>
                </Switch>

            </Router>
        )
    }

    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <Game roomID={status.roomID} mark={status.mark} />
                </Route>
                <Route path="*">
                    <Redirect to="/game"></Redirect>
                </Route>
            </Switch>

        </Router>
    )


}


export default App
