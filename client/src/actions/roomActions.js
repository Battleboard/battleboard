import {SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_CONNECTION, GET_ROOMS} from './types';
import axios from 'axios';

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

export const deleteRoom = (room) => () => {

    axios.delete('/api/rooms/room/' + room)

}