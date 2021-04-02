import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector, useDispatch } from 'react-redux'
import GameRoom from "./GameRoom";
import { setPhase, resetGame } from '../actions/userActions'

const AuthLinks = () => {
  const dispatch = useDispatch()
  const phase = useSelector(state => state.user.phase)
	const connection = useSelector(state => state.user.connection)
  const clients = useSelector(state => state.user.gameRoom);

    const setContent = () => {
      switch(phase){
        case 'select-spells':
          return <>
            <Spells />
            <SelectedSpells />
          </>
		case 'gameroom':
			return <CreateGame />
		case 'battle':
			return <GameRoom connection={connection} />
    case 'battle-over':
      return <div style={{display: 'flex', flexDirection: 'column'}}>
        <p>{`Player 1 hp: ${clients[0].health}`}</p>
        <p>{`Player 2 hp: ${clients[1].health}`}</p>
        {clients[0].health > clients[1].health ? <p>player 1 wins</p> : <p>player 2 wins</p>}
        <button onClick={() => {
          dispatch(setPhase('select-spells'))
          dispatch(resetGame())
        }}>restart</button>
      </div>
        default:
			return 'AuthLinks Switch Broken (Error 42069)'
      }
    }

    return setContent()
  }

export default AuthLinks