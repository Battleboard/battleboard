import {SET_SPELLS, SET_PHASE, RESET_GAME, REMOVE_SPELL, GET_SPELLS} from './types';
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

//REMOVE SPELL
export const removeSpell = (spell) => (dispatch) => {
    dispatch({
        type: REMOVE_SPELL,
        payload: spell
    })
}

//SET SPELLS
export const setSpells = (spell) => (dispatch) => {
    if(store.getState().user.spells.length < 6){
        dispatch({
            type: SET_SPELLS,
            payload: spell
        })
    }
}

//GET SPELLS
export const getSpells = (id) => (dispatch) => {
    console.log("id: ", id);
    axios.get('/api/users/unlockedSpells/' + id)
        /*.then(res => console.log("spells: ", res.data));*/
        .then(res => 
            dispatch({
                type:GET_SPELLS,
                payload: res.data
            }))

}

export const addSpells = (id) => (dispatch) => {
    
}
