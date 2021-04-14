import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import store from '../../store';
import { setPhase, setSelectedGame } from '../../actions/userActions';
import { setClient, setGameRoom, setConnection, getRooms, setGame } from '../../actions/roomActions';
import Button from '../styled/Button'

const Modal = ({ createGameRoom }) => {
    const [roomName, setRoomName] = useState('')
    const [password, setPassword] = useState('')

    const onRoomChange = e => setRoomName(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)

    return <div style={{width: 400, height: 300, background: '#FFF', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
        {/* Room Name */}
        <div style={{display: 'flex'}}>
            <div>Room Name</div>
            <input type="text" name="roomname" value={roomName} placeholder="Room Name" onChange={onRoomChange}/>
        </div>

        {/* Password */}
        <div style={{display: 'flex'}}>
            <div>Password</div>
            <input type="text" name="password" value={password} placeholder="Password" onChange={onPasswordChange}/>
        </div>

        <Button onClick={() => createGameRoom(roomName, password)}>Create Game</Button>
    </div>
}

const Lobby = ({setClient, setGameRoom, setConnection}) => {
    const dispatch = useDispatch()
    const gameId = useSelector(state => state.room.gameId);
    const games = useSelector(state => state.room.games)
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState('')
    
    var HOST = null;

    if(process.env.NODE_ENV === 'development'){
        HOST = "ws://localhost:5000"
    }else if(process.env.NODE_ENV === 'production'){
        HOST = window.location.origin.replace(/^http/, 'ws')
    }

    let ws = new WebSocket(HOST + '/' + store.getState().auth.id)

    useEffect(() => {
        setConnection(ws);
        console.log('set connection to: ', ws)
    // eslint-disable-next-line
    }, [ws])

    useEffect(() => {
        store.dispatch(getRooms());
    }, [gameId])

    //set the client id when the create button loads (use the players _id in future?)
    useEffect(() => {
        ws.onmessage = message => {
            const response = JSON.parse(message.data);
            if(response.method === 'connect'){
                setClient(response.clientId);
            }
        }
    // eslint-disable-next-line
    }, [])

    const onPasswordChange = (e) => setPassword(e.target.value)

    //create a game room
    const createGameRoom = (roomName, password) => {

        const payLoad = {
            "method": "create",
            "clientId": store.getState().room.clientId,
            "username": store.getState().auth.name,
            "roomname": roomName,
            "password": password
        }
        
        ws.send(JSON.stringify(payLoad));
        ws.onmessage = message => {
            const response = JSON.parse(message.data);
            
            if(response.method === 'create'){
                setGame(response.game.id)
                //joinGameRoom(response.game.id)
                dispatch(setPhase('pre-battle'))
                dispatch(setSelectedGame(response.game.id))
            }
        }
    }

	return <div style={{background: 'lightblue', display: 'flex', height: '100%'}}>

        {showModal && <Modal createGameRoom={createGameRoom} />}
        
        <div style={{flexGrow: 6, background: '#212121'}}>
                {/* Map the game list */}
                {games && games.map((game, index) => {
                    return <div key={index} onClick={() => {
                        //check if game is passworded
                        if (game.password !== '') {
                            //if passworded, show modal to enter password to continue
                            return <div style={{width: 400, height: 150, background: '#FFF', position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>

                                {/* Password */}
                                <div style={{display: 'flex'}}>
                                    <div>Password</div>
                                    <input type="text" name="password" value={password} placeholder="Password" onChange={onPasswordChange}/>
                                </div>

                                <Button onClick={() => {
                                    //game.password might not be correct
                                    if (password === game.password) {
                                        dispatch(setSelectedGame(game.id))
                                        dispatch(setPhase('pre-battle'))
                                    }
                                }}>Join</Button>
                            </div>
                        } 
                        dispatch(setSelectedGame(game.id))
                        dispatch(setPhase('pre-battle'))
                    }} style={{width: '80%', background: '#C5C5C5', margin: '20px auto', height: 80, color: '#FFF'}}>
                        <p>Host: {game.host}</p>
                        <p>Room Name: {game.roomname}</p>
                    </div>
                })}
        </div>

        <div style={{flexGrow: 1, background: '#DBE4EE'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '20px auto'}}>
                <Button style={{margin: '20px auto', borderRadius: 8, borderWidth: 5}} onClick={() => dispatch(getRooms())}>Refresh</Button>
                <Button style={{margin: '20px auto', borderRadius: 8, borderWidth: 5}} onClick={() => setShowModal(!showModal)}>Create Room</Button>

                <div style={{ borderBottom: '5px solid black'}} />

                <Button style={{margin: '20px auto', borderRadius: 8, borderWidth: 5}} onClick={() => dispatch(setPhase('spells'))}>Spells</Button>
                <Button style={{margin: '20px auto', borderRadius: 8, borderWidth: 5}} onClick={() => dispatch(setPhase('profile'))}>Profile</Button>
                <Button style={{margin: '20px auto', borderRadius: 8, borderWidth: 5}} onClick={() => dispatch(setPhase('shop'))}>Shop</Button>
            </div>
        </div>
    </div>
};

export default connect(null, {setClient, setGameRoom, setConnection})(Lobby);