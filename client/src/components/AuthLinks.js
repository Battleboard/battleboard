import Logout from './Logout';
import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector } from 'react-redux'

const AuthLinks = () => {
    const gameRoom = useSelector(state => state.user.gameRoom)
    return <div style={{display: 'flex', flexDirection: 'column'}}>
      <Logout/>
      <CreateGame/>
      {gameRoom.length === 0 && <div>
        <Spells/>
        <SelectedSpells />
      </div>}
    </div>
  }

export default AuthLinks