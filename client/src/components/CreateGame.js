import React, { useEffect, useState } from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import store from '../store';
import {setClient, setGame, setGameRoom, setConnection, setPhase} from '../actions/userActions';

import Button from './styled/Button'

const CreateGame = ({setClient, setGame, setGameRoom, setConnection}) => {
    const dispatch = useDispatch()
    const [gameToJoin, setGameToJoin] = useState("");
    const [copyLink, setCopyLink] = useState("");
    const gameId = useSelector(state => state.user.gameId);

    useEffect(() => {
        setCopyLink(store.getState().user.gameId);
    }, [gameId])

    //set the client id when the create button loads (use the players _id in future?)
    useEffect(() => {
        ws.onmessage = message => {
            const response = JSON.parse(message.data);
            if(response.method === 'connect'){
                setClient(response.clientId);
            }
        }
      }
      // eslint-disable-next-line
      , [])

    var HOST = null;

    if(process.env.NODE_ENV === 'development'){
        HOST = "ws://localhost:5000"
    }else if(process.env.NODE_ENV === 'production'){
        HOST = window.location.origin.replace(/^http/, 'ws')
    }

    let ws = new WebSocket(HOST + '/' + store.getState().auth.id)
    setConnection(ws);

    //create a game room
    const createGameRoom = () => {
        const payLoad = {
            "method": "create",
            "clientId": store.getState().user.clientId
        }
        
        ws.send(JSON.stringify(payLoad));
        ws.onmessage = message => {
            const response = JSON.parse(message.data);
            
            if(response.method === 'create'){
                setGame(response.game.id);
            }
        }
    }

    const joinGameRoom = () => {
        //if the gameId is null set the gameId to the entered gameId
        if(store.getState().user.gameId === ""){
            //set the gameId to the gameToJoin entered
            setGame(gameToJoin);
        } else {
            dispatch(setPhase("battle"))

            const payLoad = {
                "method":"join",
                "clientId":store.getState().user.clientId,
                "gameId": store.getState().user.gameId,
                "spells": store.getState().user.spells,
                "health": store.getState().user.maxHealth,
                "maxHealth": store.getState().user.maxHealth
            }
    
            ws.send(JSON.stringify(payLoad));
        }

        ws.onmessage = message => {
            const response = JSON.parse(message.data);
            if(response.method === 'join'){
                //save the game room information to store
                setGameRoom(response.game)
            }
        }
    }
    
    const handleChange = (e) => {
        setGameToJoin(e.target.value);
    }

	return <div style={{background: 'lightblue', display: 'flex', height: '100%'}}>
        <div style={{flexGrow: 4, background: '#F8F8F8'}}>
            <div style={{width: '80%', background: '#C5C5C5', margin: '20px auto', height: 80, color: '#FFF'}}>
                <p>Game Title</p>
                <p>Host</p>
            </div>
        </div>
        <div style={{flexGrow: 1, background: '#FFF'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '20px auto'}}>
                <Button style={{margin: '20px auto'}} onClick={createGameRoom}>Create Room</Button>
                <Button style={{margin: '20px auto'}} onClick={joinGameRoom}>Join Room</Button>
                <input type="text" name="gameId" placeholder="Game ID" onChange={handleChange} value={gameToJoin} style={{width:"100%"}}/>
                <p>{copyLink}</p>
            </div>
        </div>
    </div>
};

export default connect(null, {setClient, setGame, setGameRoom, setConnection})(CreateGame);