import React, { useEffect, useState } from 'react';
import {connect, useSelector} from 'react-redux';
import store from '../store';
import GameRoom from "./GameRoom";
import {setClient, setGame, setGameRoom} from '../actions/userActions';

const CreateGame = ({setClient, setGame, setGameRoom}) => {
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
        }

            const payLoad = {
                "method":"join",
                "clientId":store.getState().user.clientId,
                "gameId": store.getState().user.gameId,
                "spells": store.getState().user.spells,
                "health": store.getState().user.health
            }

            ws.send(JSON.stringify(payLoad));
    
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

	return  <div style={{flexGrow: 1, background:"white"}}>

                <p>User Name: {store.getState().auth && store.getState().auth.name}</p>
                <p>User ID: {store.getState().auth && store.getState().auth.id}</p>

                <button onClick={createGameRoom} >Create Game Room</button>

                <button onClick={() => {navigator.clipboard.writeText(copyLink)}}>Copy Game Room Link</button>
                <p>{copyLink}</p>

                <input type="text" name="gameId" placeholder="Game ID" onChange={handleChange} value={gameToJoin} style={{width:"100%"}}/>

                <button onClick={joinGameRoom}>Join Game</button>  
                
                <GameRoom connection={ws}/>
                
            </div>
};

export default connect(null, {setClient, setGame, setGameRoom})(CreateGame);