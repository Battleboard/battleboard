import {SET_SPELLS, SET_PHASE, RESET_GAME, REMOVE_SPELL, SET_INFO, GET_INFO} from './types';
import axios from 'axios'
import store from '../store';

//GET USER INFO
export const getUserInfo = (id) => (dispatch) => {
    axios.get('/api/users/userdata/' + id)
        .then(res => dispatch({
            type: GET_INFO,
            payload: res.data
        }))
        .catch(err => console.error(err))
}

//SET USER INFO
export const setUserInfo = (id, data) => dispatch => {
    axios.post('/api/users/setuserdata/' + id, {data: data})
        .then(() => dispatch({
            type: SET_INFO,
            payload: data
        }))
        .catch(err => console.error(err))
}

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
