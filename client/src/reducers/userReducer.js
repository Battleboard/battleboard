import {SET_SPELLS, SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_PHASE, SET_CONNECTION, RESET_GAME, GET_ROOMS, REMOVE_SPELL, DELETE_ROOM} from '../actions/types';

const initialState = {
    spells:[],
    clientId: "",
    gameRoom: [],
    maxHealth: 2500,
    phase: "select-spells",
    connection: {},
    games: []
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

        case SET_CLIENT_ID:
            return{
                ...state,
                clientId: action.payload
            };
        case SET_GAME_ID:
            return{
                ...state,
                gameId: action.payload
            }
        case SET_GAME_ROOM:
            return{
                ...state,
                gameRoom: [...action.payload]
            }
        case SET_PHASE:
            return {
                ...state,
                phase: action.payload
            }
        case SET_CONNECTION:
            return{
                ...state,
                connection: action.payload
            }
        case RESET_GAME:
            return initialState;

        case GET_ROOMS:
            return {
                ...state,
                games: action.payload
            }
        case DELETE_ROOM:
            return {
                ...state,
                games: action.payload
            }
        default:
            return state;
    }
}