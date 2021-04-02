import { useState } from 'react'
import Logout from './Logout';
import Spells from "./Spells";
import CreateGame from "./CreateGame";
import SelectedSpells from "./SelectedSpells";
import { useSelector } from 'react-redux'

const AuthLinks = () => {
    const gameRoom = useSelector(state => state.user.gameRoom)
    const [phase, setPhase] = useState('select-spells')

    const setContent = () => {
      switch(phase){
        case 'select-spells':
          return <>
            <Spells />
            <SelectedSpells />
          </>
      }
    }

    return setContent()
  }

export default AuthLinks