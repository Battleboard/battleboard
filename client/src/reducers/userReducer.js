import {SET_SPELLS, SET_PHASE, RESET_GAME, REMOVE_SPELL, GET_SPELLS, GET_GOLD, BUY_PACKS} from '../actions/types';

const initialState = {
    spells:[],
    maxHealth: 2500,
    startingHealth:2500,
    phase: "select-spells",
    maxShield:3000,
    startingShield:0,
    unlockedSpells:[],
    gold: 0
    
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
        case GET_SPELLS:
            return{
                ...state,
                unlockedSpells: [...action.payload]
            }
        case GET_GOLD:
            return{
                ...state,
                gold: action.payload
            }
        case BUY_PACKS:
            return{
                ...state,
                gold: action.payload.gold,
                unlockedSpells: [...action.payload.spells]
            }
        default:
            return state;
    }
}