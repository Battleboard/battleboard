import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteRoom } from '../actions/roomActions'
import { setUserInfo, setPhase, resetGame } from '../actions/userActions'

const BattleOver = ({ player, opponent }) => {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.room.gameRoom);
    const auth = useSelector(state => state.auth)

    const declareWinner = () => {
        switch(true){
            case clients[player].health > 0 && clients[opponent].health > 0:
                return 'draws'
            case clients[player].health > 0 && clients[player].health > clients[opponent].health:
                return 'wins'
            case clients[opponent].health > 0 && clients[opponent].health > clients[player].health:
                return 'losses'
            default:
                return 'draws'
        }
    }

    useEffect(() => {
        if (auth.id){
            dispatch(deleteRoom(clients[0].gameId))
		    dispatch(setUserInfo(auth.id, declareWinner()))
        }
    }, [auth])

    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <p>{`Player 1 hp: ${clients[0].health}`}</p>
        <p>{`Player 2 hp: ${clients[1].health}`}</p>
        {clients[0].health > clients[1].health ? <p>player 1 wins</p> : <p>player 2 wins</p>}
        <button onClick={() => {
            dispatch(setPhase('select-spells'))
            dispatch(resetGame())
        }}>restart</button>
    </div>
}

export default BattleOver