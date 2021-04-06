import {SET_SPELLS, SET_PHASE, RESET_GAME, REMOVE_SPELL, SET_INFO, GET_INFO} from '../actions/types';

const initialState = {
    spells:[],
    maxHealth: 3000,
    startingHealth: 2000,
    phase: "select-spells",
    maxShield: 3000,
    startingShield: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

export default function userReducer(state = initialState, action, payload){
    switch(action.type){
        case GET_INFO:
            return {
                ...state,
                wins: action.payload.wins,
                losses: action.payload.losses,
                draws: action.payload.draws
            }

        case SET_INFO:
            switch(action.payload){
                case 'wins':
                    console.log(action.payload)
                    return {
                        ...state,
                        wins: state.wins + 1
                    }
                case 'losses':
                    return {
                        ...state,
                        losses: state.losses + 1
                    }
                case 'draws': 
                    return {
                        ...state,
                        draws: state.draws + 1
                    }
                default:
                    return state
            }

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
            return {
                ...state,
                maxHealth: 3000,
                startingHealth: 1500,
                phase: "gameroom",
                maxShield: 3000,
                startingShield: 0
            };
        default:
            return state;
    }
}