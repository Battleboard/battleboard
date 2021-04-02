import {SET_SPELLS, SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_PHASE, SET_CONNECTION, RESET_GAME} from './types';
import store from '../store';

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
    console.log("game room update: ", game);
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

