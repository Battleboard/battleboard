import {SET_SPELLS, SET_PHASE, RESET_GAME, REMOVE_SPELL} from '../actions/types';

const initialState = {
    spells:[],
    maxHealth: 2500,
    startingHealth:1000,
    phase: "select-spells",
    maxShield:2500,
    startingShield:500
}

export default function userReducer(state = initialState, action, payload){
    switch(action.type){
        case SET_SPELLS:
            return{
                ...state,
                spells: state.spells.concat(action.payload)
            };

        case REMOVE_SPELL:
            return {
                ...state,
                spells: state.spells.filter(spell => spell !== action.payload)
            }
        case SET_PHASE:
            return {
                ...state,
                phase: action.payload
            }
        case RESET_GAME:
            return initialState;
        default:
            return state;
    }
}