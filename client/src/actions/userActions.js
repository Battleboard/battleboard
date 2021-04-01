import {SET_SPELLS, SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM} from './types';
import store from '../store';

//SET SPELLS
export const setSpells = (spell) => (dispatch) =>{
    
    console.log("Spell Length: ", store.getState().user.spells.length);

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

//SET_CLIENT_ID

