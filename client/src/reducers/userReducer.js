import {SET_SPELLS, SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_PHASE, SET_CONNECTION} from '../actions/types';

const initialState = {
    spells:[],
    clientId: "",
    gameId: "",
    gameRoom: [],
    maxHealth: 1000,
    phase: "select-spells",
    connection: {}
}

export default function userReducer(state = initialState, action, payload){
    switch(action.type){
        case SET_SPELLS:
            return{
                ...state,
                spells: state.spells.concat(action.payload)
            };

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
        default:
            return state;
    }
}