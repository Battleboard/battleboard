import React, { useEffect } from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import store from '../store';
import {setPhase} from '../actions/userActions';
import {setClient, setGameRoom, setConnection, getRooms} from '../actions/roomActions';
import Button from './styled/Button'

const CreateGame = ({setClient, setGameRoom, setConnection}) => {
    const dispatch = useDispatch()
    const gameId = useSelector(state => state.room.gameId);
    const games = useSelector(state => state.room.games)
    
    var HOST = null;

    if(process.env.NODE_ENV === 'development'){
        HOST = "ws://localhost:5000"
    }else if(process.env.NODE_ENV === 'production'){
        HOST = window.location.origin.replace(/^http/, 'ws')
    }

    let ws = new WebSocket(HOST + '/' + store.getState().auth.id)

    useEffect(() => {
        setConnection(ws);
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
      }
      // eslint-disable-next-line
      , [])

    //create a game room
    const createGameRoom = () => {

        const payLoad = {
            "method": "create",
            "clientId": store.getState().room.clientId,
            "username": store.getState().auth.name
        }
        
        ws.send(JSON.stringify(payLoad));
        ws.onmessage = message => {
            const response = JSON.parse(message.data);
            
            if(response.method === 'create'){
                //setGame(response.game.id);
                joinGameRoom(response.game.id)
            }
        }

        
    }

    const joinGameRoom = (id) => {

            dispatch(setPhase("battle"))

            console.log("starting shield: ", store.getState().user.startingShield);

            const payLoad = {
                "method":"join",
                "clientId":store.getState().room.clientId,
                "gameId": id,
                "spells": store.getState().user.spells,
                "health": store.getState().user.startingHealth,
                "maxHealth": store.getState().user.maxHealth,
                "username": store.getState().auth.name,
                "maxShield": store.getState().user.maxShield,
                "shield": store.getState().user.startingShield
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

	return <div style={{background: 'lightblue', display: 'flex', height: '100%'}}>
        <div style={{flexGrow: 4, background: '#212121'}}>     

                {/* Map the game list */}
                {games && games.map((game, index) => {
                    return <div key={index} onClick={() => joinGameRoom(game.id)} style={{width: '80%', background: '#C5C5C5', margin: '20px auto', height: 80, color: '#FFF'}}>
                        <p>Host: {game.host}</p>
                    </div>
                })}
        </div>
        <div style={{flexGrow: 1, background: '#FFF'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '20px auto'}}>
                <Button onClick={() => dispatch(getRooms())}>Refresh</Button>
                <Button style={{margin: '20px auto'}} onClick={createGameRoom}>Create Room</Button>
            </div>
        </div>
    </div>
};

export default connect(null, {setClient, setGameRoom, setConnection})(CreateGame);