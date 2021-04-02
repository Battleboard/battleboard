import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector } from 'react-redux'
import GameRoom from "./GameRoom";

const AuthLinks = () => {
    const phase = useSelector(state => state.user.phase)
	const connection = useSelector(state => state.user.connection)

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
        default:
			return 'AuthLinks Switch Broken (Error 42069)'
      }
    }

    return setContent()
  }

export default AuthLinks