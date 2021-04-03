import {SET_SPELLS, SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_PHASE, SET_CONNECTION, RESET_GAME, GET_ROOMS} from './types';
import store from '../store';
import axios from 'axios';

//RESET GAME
export const resetGame = () => (dispatch) => {
    dispatch({ type: RESET_GAME })
}

//SET PHASE
export const setPhase = (phase) => (dispatch) => {
    dispatch({
        type: SET_PHASE,
        payload: phase
    })
}

//SET SPELLS
export const setSpells = (spell) => (dispatch) =>{
    if(store.getState().user.spells.length < 4){
        dispatch({
            type: SET_SPELLS,
            payload: spell
        })
    }
}

export const setClient = (clientId) => (dispatch) => {
    dispatch({
        type: SET_CLIENT_ID,
        payload:clientId
    })

}

export const setGame = (gameId) => (dispatch) => {
    dispatch({
        type: SET_GAME_ID,
        payload: gameId
    })


}

export const setGameRoom = (game) => (dispatch) => {
    dispatch({
        type: SET_GAME_ROOM,
        payload: game.clients
    })
}

export const setConnection = (connection) => (dispatch) => {
    dispatch({
        type: SET_CONNECTION,
        payload: connection
    })
}

export const getRooms = () => (dispatch) => {
    axios.get('/api/rooms')
        .then(res => dispatch({
            type: GET_ROOMS,
            payload: Object.values(res.data.games)       
        }))
        
    

}